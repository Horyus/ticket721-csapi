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
        return (await this.web3.eth.sign(challenge, this.coinbase));
    }

    verify(challenge, signature, address) {
        return (compareAddress(Ethers.Wallet.verifyMessage(challenge, signature), address));
    }
}

