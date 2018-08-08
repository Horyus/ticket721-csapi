const Ethers = require("ethers");

export function compareAddress(address_one, address_two) {

    if (address_one.indexOf("0x") === -1) {
        address_one = "0x" + address_one;
    }
    if (address_two.indexOf("0x") === -1) {
        address_two = "0x" + address_two;
    }

    return (address_one.toLowerCase() === address_two.toLowerCase())
}

const request = require('request');

export class T721CSAPI {

    constructor(url, coinbase, web3) {
        this.url = url;
        this.coinbase = coinbase;
        this.web3 = web3;
        this.request = request.defaults({
            headers: {
                'Access-Control-Request-Headers': 'withcredentials'
            },
            jar: true
        });
        this.token = null;
    }

    async challenge() {
        return new Promise((ok, ko) => {
            this.request.post({url: this.url + "/challenge", jar: true, form: {address: this.coinbase}}, (err, resp, body) => {
                if (err) {
                    ko(err);
                } else {
                    try {
                        const parsed_body = JSON.parse(body);
                        ok(parsed_body.challenge);
                    } catch (e) {
                        ko(e);
                    }
                }
            });
        });
    }

    async register() {
        return new Promise(async (ok, ko) => {
            try {
                const challenge = await this.challenge();
                const signature = await this.signChallenge(challenge);
                this.request.post({url: this.url + "/register", followAllRedirects: true, form: {address: this.coinbase, signature: signature}}, async (err, resp, body) => {
                    if (err) {
                        ko(err);
                    } else {
                        const parsed_body = JSON.parse(body);
                        console.log("HERE ?");
                        if (compareAddress(parsed_body.address, this.coinbase)) {
                            try {
                                ok(await this.connect(signature));
                            } catch (e) {
                                ko(e);
                            }
                        } else {
                            ko(new Error("Invalid returned address"));
                        }
                    }
                })
            } catch (e) {
                ko(e);
            }
        });
    }

    async check_token(_token) {
        return new Promise(async (ok, ko) => {
            try {
                this.request.get({url: this.url + "/check_token", followAllRedirects: true, headers: {'Authorization': 'bearer ' + _token}}, (err, resp, body) => {
                    if (err) {
                        ko(err);
                    } else {
                        if (resp.statusCode === 200) {
                            this.token = _token;
                        }
                        ok(resp.statusCode === 200);
                    }
                })
            } catch (e) {
                ko(e);
            }
        });
    }

    async connect(_signature) {
        return new Promise(async (ok, ko) => {
            try {
                if (this.token) {
                    ok(true);
                } else {
                    if (!_signature) {
                        const challenge = await this.challenge();
                        _signature = await this.signChallenge(challenge);
                    }
                    this.request.post({url: this.url + "/login", followAllRedirects: true, form: {address: this.coinbase, signature: _signature}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            const parsed_body = JSON.parse(body);
                            this.token = parsed_body.token;
                            ok(this.token);
                        }
                    })
                }
            } catch (e) {
                ko(e);
            }
        });
    }

    async get_infos() {
        return new Promise(async (ok, ko) => {
            try {
                if (this.token) {
                    this.request.get({url: this.url + "/", followAllRedirects: true, headers: {'Authorization': 'bearer ' + this.token}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            const parsed_body = JSON.parse(body);
                            ok(parsed_body);
                        }
                    })
                } else {
                    this.request.get({url: this.url + "/", followAllRedirects: true}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            const parsed_body = JSON.parse(body);
                            ok(parsed_body);
                        }
                    })
                }
            } catch (e) {
                ko(e);
            }
        });
    }

    async get_events() {
        return new Promise(async (ok, ko) => {
            try {
                this.request.get({url: this.url + "/get_events", followAllRedirects: true}, (err, resp, body) => {
                    if (err) {
                        ko(err);
                    } else {
                        const parsed_body = JSON.parse(body);
                        ok(parsed_body);
                    }
                })
            } catch (e) {
                ko(e);
            }
        });
    }

    async registered() {
        return new Promise(async (ok, ko) => {
            try {
                this.request.post({url: this.url + "/registered", followAllRedirects: true, form: {address: this.coinbase}}, (err, resp, body) => {
                    if (err) {
                        ko(err);
                    } else {
                        const parsed_body = JSON.parse(body);
                        ok(parsed_body);
                    }
                });
            } catch (e) {
                ko(e);
            }
        });
    }

    async fetch_wallets() {
        return new Promise(async (ok, ko) => {
            try {
                if (this.token) {
                    this.request.get({url: this.url + "/refresh_wallets", followAllRedirects: true, headers: {'Authorization': 'bearer ' + this.token}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            const parsed_body = JSON.parse(body);
                            ok(parsed_body);
                        }
                    })
                } else {
                    throw new Error("Calling refresh_wallets requires you to be logged");
                }
            } catch (e) {
                ko(e);
            }
        });
    }

    async signChallenge(challenge) {
        return new Promise((ok, ko) => {
            //const newMsgParams = {
            //    "types":{
            //        "EIP712Domain":[
            //            {
            //                "name":"name",
            //                "type":"string"
            //            }
            //        ],
            //        "Challenge":[
            //            {
            //                "name":"challenge",
            //                "type":"string"
            //            }
            //        ]
            //    },
            //    "primaryType":"Challenge",
            //    "domain":{
            //        "name":"Ticket721 Challenge"
            //    },
            //    "message":{
            //        "challenge": challenge
            //    }
            //};
            const msgParams = [{
                type: 'string',
                name: 'challenge',
                value: challenge
            }];
            try {
                this.web3.currentProvider.sendAsync({
                    method: 'eth_signTypedData',
                    params: [msgParams, this.coinbase],
                    from: this.coinbase
                }, (err, result) => {
                    if (err || result.error) {
                        ko(err || result.error);
                    } else {
                        ok(result.result);
                    }
                });
            } catch (e) {
                ko(e);
            }
        })
    }

    verify(challenge, signature, address) {
        return (compareAddress(Ethers.Wallet.verifyMessage(challenge, signature), address));
    }
}

