const lambda = require('../../src/index').graphqlHandler;
const jsonPayload = require('./create-payload');

describe("Create a user", () => {
    it("Can create a user", async (done) => {
        lambda(jsonPayload, {}, (error, result) => {
            if(error) {
                done(error);
            }

            done();
        });
    });
});