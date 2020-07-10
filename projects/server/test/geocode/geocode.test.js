// https://github.com/vandium-io/lambda-tester/tree/9ebc71a61206749c467cc71658a633785f10dfa2/docs
const LambdaTester = require( 'lambda-tester' );
const lambda = require('../../src/index').lambda;

const geocodePayload = require('./geocode-payload');

describe("Geocode API", () => {
    it("Can geocode an address", async (done) => {
        await LambdaTester(lambda).event(geocodePayload).expectResult((arg) => {
            if (arg.statusCode !== 200) {
                done(new Error(JSON.stringify(arg)));
            }

            // TODO: Check that we decoded the correct address.
            done();
        });
    });
});