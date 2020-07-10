import { fetchGetUsersPage } from "../../src/api/graphql";

describe("API", () => {
    it("Can fetch users pages", async (done) => {
        fetchGetUsersPage().then((result) => {
            return result.json();
        }).catch(done);
    });
});