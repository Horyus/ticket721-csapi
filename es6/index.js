export class T721CSAPI {

    constructor(url, password, coinbase, web3) {
        this.url = url;
        this.password = password;
        this.coinbase = coinbase;
        this.web3 = web3;
    }

    register() {

    }

    connect() {

    }

    async signChallenge(challenge) {
        return (await this.web3.eth.sign(challenge));
    }
}
