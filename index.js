function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

export class T721CSAPI {

    constructor(url, password, coinbase, web3) {
        this.url = url;
        this.password = password;
        this.coinbase = coinbase;
        this.web3 = web3;
    }

    register() {}

    connect() {}

    signChallenge(challenge) {
        var _this = this;

        return _asyncToGenerator(function* () {
            return yield _this.web3.eth.sign(challenge);
        })();
    }
}