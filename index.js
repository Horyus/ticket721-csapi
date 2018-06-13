"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.compareAddress = compareAddress;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ethers = require("ethers");

function compareAddress(address_one, address_two) {

    if (address_one.indexOf("0x") === -1) {
        address_one = "0x" + address_one;
    }
    if (address_two.indexOf("0x") === -1) {
        address_two = "0x" + address_two;
    }

    return address_one.toLowerCase() === address_two.toLowerCase();
}

var T721CSAPI = exports.T721CSAPI = function () {
    function T721CSAPI(url, password, coinbase, web3) {
        _classCallCheck(this, T721CSAPI);

        this.url = url;
        this.password = password;
        this.coinbase = coinbase;
        this.web3 = web3;
    }

    _createClass(T721CSAPI, [{
        key: "register",
        value: function register() {}
    }, {
        key: "connect",
        value: function connect() {}
    }, {
        key: "signChallenge",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(challenge) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.web3.eth.sign(challenge, this.coinbase);

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function signChallenge(_x) {
                return _ref.apply(this, arguments);
            }

            return signChallenge;
        }()
    }, {
        key: "verify",
        value: function verify(challenge, signature, address) {
            return compareAddress(Ethers.Wallet.verifyMessage(challenge, signature), address);
        }
    }]);

    return T721CSAPI;
}();