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

export class T721CSAPI {

    constructor(url, coinbase, web3) {
        this.url = url;
        this.coinbase = coinbase;
        this.web3 = web3;
        this.request = require('request');
    }

    async challenge() {
        return new Promise((ok, ko) => {
            this.request.post({url: this.url + "/challenge", form: {address: this.coinbase}}, (err, resp, body) => {
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
                this.request.post({url: this.url + "/register", form: {address: this.coinbase, signature: signature}}, (err, resp, body) => {
                    if (err) {
                        ko(err);
                    } else {
                        const parsed_body = JSON.parse(body);
                        this.token = signature;
                        ok(parsed_body.address);
                    }
                })
            } catch (e) {
                ko(e);
            }
        });
    }


    async connect() {
        return new Promise(async (ok, ko) => {
            try {
                if (this.token) {
                    this.request.post({url: this.url + "/login", followAllRedirects: true, jar: true, form: {address: this.coinbase, signature: this.token}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            const parsed_body = JSON.parse(body);
                            ok(parsed_body.logged);
                        }
                    })
                } else {
                    const challenge = await this.challenge();
                    const signature = await this.signChallenge(challenge);
                    this.request.post({url: this.url + "/login", followAllRedirects: true, jar: true, form: {address: this.coinbase, signature: signature}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            this.token = signature;
                            const parsed_body = JSON.parse(body);
                            ok(parsed_body.logged);
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
                this.request.get({url: this.url + "/", followAllRedirects: true, jar: true}, (err, resp, body) => {
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

    async refresh_wallets() {
        return new Promise(async (ok, ko) => {
            try {
                if (this.token) {
                    this.request.post({url: this.url + "/refresh_wallets", followAllRedirects: true, jar: true, form: {address: this.coinbase}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            const parsed_body = JSON.parse(body);
                            ok(parsed_body);
                        }
                    })
                } else {
                    const challenge = await this.challenge();
                    const signature = await this.signChallenge(challenge);
                    this.request.post({url: this.url + "/login", followAllRedirects: true, jar: true, form: {address: this.coinbase, signature: signature}}, (err, resp, body) => {
                        if (err) {
                            ko(err);
                        } else {
                            this.token = signature;
                            this.request.post({url: this.url + "/refresh_wallets", followAllRedirects: true, jar: true, form: {address: this.coinbase}}, (err, resp, body) => {
                                if (err) {
                                    ko(err);
                                } else {
                                    const parsed_body = JSON.parse(body);
                                    ok(parsed_body);
                                }
                            })
                        }
                    })
                }
            } catch (e) {
                ko(e);
            }
        });
    }

    async signChallenge(challenge) {
        return (await this.web3.eth.sign(challenge, this.coinbase));
    }

    verify(challenge, signature, address) {
        return (compareAddress(Ethers.Wallet.verifyMessage(challenge, signature), address));
    }
}

