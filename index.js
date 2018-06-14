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
    function T721CSAPI(url, coinbase, web3) {
        _classCallCheck(this, T721CSAPI);

        this.url = url;
        this.coinbase = coinbase;
        this.web3 = web3;
        this.request = require('request');
    }

    _createClass(T721CSAPI, [{
        key: "challenge",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt("return", new Promise(function (ok, ko) {
                                    _this.request.post({ url: _this.url + "/challenge", form: { address: _this.coinbase } }, function (err, resp, body) {
                                        if (err) {
                                            ko(err);
                                        } else {
                                            try {
                                                var parsed_body = JSON.parse(body);
                                                ok(parsed_body.challenge);
                                            } catch (e) {
                                                ko(e);
                                            }
                                        }
                                    });
                                }));

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function challenge() {
                return _ref.apply(this, arguments);
            }

            return challenge;
        }()
    }, {
        key: "register",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt("return", new Promise(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ok, ko) {
                                        var challenge, signature;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.prev = 0;
                                                        _context2.next = 3;
                                                        return _this2.challenge();

                                                    case 3:
                                                        challenge = _context2.sent;
                                                        _context2.next = 6;
                                                        return _this2.signChallenge(challenge);

                                                    case 6:
                                                        signature = _context2.sent;

                                                        _this2.request.post({ url: _this2.url + "/register", form: { address: _this2.coinbase, signature: signature } }, function (err, resp, body) {
                                                            if (err) {
                                                                ko(err);
                                                            } else {
                                                                var parsed_body = JSON.parse(body);
                                                                _this2.token = signature;
                                                                ok(parsed_body.address);
                                                            }
                                                        });
                                                        _context2.next = 13;
                                                        break;

                                                    case 10:
                                                        _context2.prev = 10;
                                                        _context2.t0 = _context2["catch"](0);

                                                        ko(_context2.t0);

                                                    case 13:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this2, [[0, 10]]);
                                    }));

                                    return function (_x, _x2) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function register() {
                return _ref2.apply(this, arguments);
            }

            return register;
        }()
    }, {
        key: "connect",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this3 = this;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt("return", new Promise(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ok, ko) {
                                        var challenge, signature;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.prev = 0;

                                                        if (!_this3.token) {
                                                            _context4.next = 5;
                                                            break;
                                                        }

                                                        _this3.request.post({ url: _this3.url + "/login", followAllRedirects: true, jar: true, form: { address: _this3.coinbase, signature: _this3.token } }, function (err, resp, body) {
                                                            if (err) {
                                                                ko(err);
                                                            } else {
                                                                var parsed_body = JSON.parse(body);
                                                                ok(parsed_body.logged);
                                                            }
                                                        });
                                                        _context4.next = 12;
                                                        break;

                                                    case 5:
                                                        _context4.next = 7;
                                                        return _this3.challenge();

                                                    case 7:
                                                        challenge = _context4.sent;
                                                        _context4.next = 10;
                                                        return _this3.signChallenge(challenge);

                                                    case 10:
                                                        signature = _context4.sent;

                                                        _this3.request.post({ url: _this3.url + "/login", followAllRedirects: true, jar: true, form: { address: _this3.coinbase, signature: signature } }, function (err, resp, body) {
                                                            if (err) {
                                                                ko(err);
                                                            } else {
                                                                _this3.token = signature;
                                                                var parsed_body = JSON.parse(body);
                                                                ok(parsed_body.logged);
                                                            }
                                                        });

                                                    case 12:
                                                        _context4.next = 17;
                                                        break;

                                                    case 14:
                                                        _context4.prev = 14;
                                                        _context4.t0 = _context4["catch"](0);

                                                        ko(_context4.t0);

                                                    case 17:
                                                    case "end":
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this3, [[0, 14]]);
                                    }));

                                    return function (_x3, _x4) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function connect() {
                return _ref4.apply(this, arguments);
            }

            return connect;
        }()
    }, {
        key: "signChallenge",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(challenge) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.web3.eth.sign(challenge, this.coinbase);

                            case 2:
                                return _context6.abrupt("return", _context6.sent);

                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function signChallenge(_x5) {
                return _ref6.apply(this, arguments);
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