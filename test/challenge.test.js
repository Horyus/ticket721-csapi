const _Web3 = require("web3");
const T721CSAPI = require("../index.js").T721CSAPI;
const randomstring = require("randomstring");


describe("Testing Challenge", () => {

    let Web3;
    let api;
    let coinbase;

    let signatures = [];

    beforeAll(async (done) => {
        Web3 = new _Web3(new _Web3.providers.HttpProvider("http://localhost:8548"));
        coinbase = await Web3.eth.getCoinbase();
        api = new T721CSAPI("", "", coinbase, Web3);
        done();
    });

    describe("Sign Challenges", () => {

        const sign_chall = async (chal, done) => {
            try {
                signatures.push({
                    challenge: chal,
                    signature: await api.signChallenge(chal)
                });
                process.stdout.write(":: signChallenge :: " + chal + "\n");
                done();
            } catch (e) {
                done(e);
            }
        };

        for (let idx = 0; idx < 100; ++idx) {
            test("Sign #" + (idx + 1), sign_chall.bind(null, randomstring.generate(idx + 1)));
        }

    });

    describe("Verify signatures", () => {

        const verify_sigs = async (idx, done)  => {
            try {
                if (!api.verify(signatures[idx].challenge, signatures[idx].signature, coinbase))
                    throw new Error("Invalid Signature " + signatures[idx].challenge);
                done();
            } catch (e) {
                done(e);
            }
        };

        for (let idx = 0; idx < 100; ++idx) {
            test("Verify #" + (idx + 1), verify_sigs.bind(null, idx));
        }
    });

});
