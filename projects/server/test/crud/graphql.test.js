const lambda = require('../../src/index').lambda;
// https://github.com/vandium-io/lambda-tester/tree/9ebc71a61206749c467cc71658a633785f10dfa2/docs
const LambdaTester = require( 'lambda-tester' );
const { buildSchema } = require('graphql');
const {schemaTemplate} = require('../../src/schema');
const {createRequest} = require('./create-request');


describe("GraphQL endpoint", () => {
    it("Has a valid schema", async (done) => {
        try {
            buildSchema(schemaTemplate);
            done();
        }
        catch(e) {
            done(new Error(`Invalid schema: ${e.toString()}`));
        }
    });

    let createdUserId = null;
    it("Can create a user", async (done) => {
        await LambdaTester(lambda).event(createRequest("/graphql", {
            bodyString: "{\"query\":\"mutation createUser($createInput: CreateUserInput!){\\r\\n  createUser(input: $createInput) {\\r\\n    id\\r\\n  }\\r\\n}\",\"variables\":{\r\n  \"createInput\": {\r\n    \"name\": \"Mark\"\r\n  }\r\n}}"
        })).expectResult((arg) => {
            console.log(JSON.stringify(arg));
            if (arg.statusCode !== 200) {
                done(new Error(`Failed to create a new user.`));
            }

            const parsedData = JSON.parse(arg.body);

            createdUserId = parsedData.data.createUser.id;

            done();
        });
    });

    
    it("Can fetch a page", async (done) => {
        await LambdaTester(lambda).event(createRequest("/graphql", {
            bodyString: JSON.stringify({
                "query":"query getPage($pageCount: Int, $filter: String) {\r\n  getPages(pageCount: $pageCount, filter: $filter) {\r\n    users {\r\n      id\r\n      name\r\n    }\r\n    nextToken {\r\n      id\r\n    }\r\n  }\r\n}",
                "variables":{"pageCount":1,"filter":"dsfa"}
            })
        })).expectResult((arg) => {
            console.log(JSON.stringify(arg));
            if (arg.statusCode !== 200) {
                done(new Error(`Failed to fetch page.`));
            }

            const parsedData = JSON.parse(arg.body);

            if ((parsedData?.data?.getPages?.users?.length || 0) === 0) {
                done(new Error(`No users returned!`))
            }

            done();
        });
    });

    it("Can delete a user", async (done) => {
        if (!createdUserId) {
            done(new Error("Unable to test delete user!"));
        }

        await LambdaTester(lambda).event(createRequest("/graphql", {
            bodyString: JSON.stringify({
                "query":"mutation deleteUser($user: DeleteUserInput!){\r\n  deleteUser(input: $user)\r\n}",
                "variables":{"user":{"id":"6b46c4d8-d9af-4ee0-bb3c-691c07c77b88"}}
            })
        })).expectResult((arg) => {
            console.log(JSON.stringify(arg));
            if (arg.statusCode !== 200) {
                done(new Error(`Failed to delete a user.`));
            }

            done();
        });
    });

    it("Can fetch the next page", async (done) => {
        if (!createdUserId) {
            done(new Error("Unable to test next page!"));
        }
        
        let createdUserIds = [];

        // Ensure there are enough users to generate a second page.
        for(let i = 0; i < 7; i += 1) {
            await LambdaTester(lambda).event(createRequest("/graphql", {
                bodyString: JSON.stringify({
                    "query":"mutation createUser($createInput: CreateUserInput!){\r\n  createUser(input: $createInput) {\r\n    id\r\n  }\r\n}",
                    "variables":{"createInput":{"name":`Test_${i}`}}
                })
            })).expectResult((arg) => {
                console.log(JSON.stringify(arg));
                if (arg.statusCode !== 200) {
                    throw new Error(`Failed to create a new user.`);
                }
    
                const parsedData = JSON.parse(arg.body);

                createdUserIds.push(parsedData.data.createUser.id)
            });
        }

        // Get the nextToken.
        let nextToken = null;
        await LambdaTester(lambda).event(createRequest("/graphql", {
            bodyString: JSON.stringify({
                "query":"query getPage($pageCount: Int, $filter: String) {\r\n  getPages(pageCount: $pageCount, filter: $filter) {\r\n    users {\r\n      id\r\n      name\r\n    }\r\n    nextToken {\r\n      id\r\n    }\r\n  }\r\n}",
                "variables":{"pageCount":1,"filter":""}
            })
        })).expectResult((arg) => {
            console.log(JSON.stringify(arg));
            if (arg.statusCode !== 200) {
                throw new Error(`Failed to fetch page.`);
            }

            const parsedData = JSON.parse(arg.body);

            if (parsedData?.data?.getPages?.nextToken === null) {
                throw new Error(`No next token!`);
            }

            nextToken = parsedData.data.getPages.nextToken;
        });

        // TODO: This should cleanup even if the fetch page fails.
        await LambdaTester(lambda).event(createRequest("/graphql", {
            bodyString: JSON.stringify({
                "query":"query getPage($nextToken: NextTokenInput, $filter: String) {\r\n  getNextPage(nextToken: $nextToken, filter: $filter) {\r\n    users {\r\n      id\r\n      name\r\n    }\r\n    nextToken {\r\n      id\r\n    }\r\n  }\r\n}",
                "variables":{"nextToken":nextToken,"filter":"dsfa"}
            })
        })).expectResult((arg) => {
            console.log(JSON.stringify(arg));
            if (arg.statusCode !== 200) {
                throw new Error(`Failed to fetch next page.`);
            }

            const parsedData = JSON.parse(arg.body);

            if ((parsedData?.data?.getNextPage?.users?.length || 0) === 0) {
                throw new Error(`No users returned!`);
            }
        });

        for(let userId of createdUserIds) {
            await LambdaTester(lambda).event(createRequest("/graphql", {
                bodyString: JSON.stringify({
                    "query":"mutation deleteUser($user: DeleteUserInput!){\r\n  deleteUser(input: $user)\r\n}",
                    "variables":{"user":{"id":userId}}
                })
            })).expectResult((arg) => {
                console.log(JSON.stringify(arg));
                if (arg.statusCode !== 200) {
                    throw new Error(`Failed to delete a user.`);
                }
            });
        }

        done();
    });
});