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
                                                            console.log(err, resp, body);
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
        key: "get_infos",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _this4 = this;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                return _context7.abrupt("return", new Promise(function () {
                                    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                            while (1) {
                                                switch (_context6.prev = _context6.next) {
                                                    case 0:
                                                        try {
                                                            _this4.request.get({ url: _this4.url + "/", followAllRedirects: true, jar: true }, function (err, resp, body) {
                                                                if (err) {
                                                                    ko(err);
                                                                } else {
                                                                    var parsed_body = JSON.parse(body);
                                                                    ok(parsed_body);
                                                                }
                                                            });
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context6.stop();
                                                }
                                            }
                                        }, _callee6, _this4);
                                    }));

                                    return function (_x5, _x6) {
                                        return _ref7.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function get_infos() {
                return _ref6.apply(this, arguments);
            }

            return get_infos;
        }()
    }, {
        key: "registered",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var _this5 = this;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                return _context9.abrupt("return", new Promise(function () {
                                    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                            while (1) {
                                                switch (_context8.prev = _context8.next) {
                                                    case 0:
                                                        try {
                                                            _this5.request.post({ url: _this5.url + "/registered", followAllRedirects: true, jar: true, form: { address: _this5.coinbase } }, function (err, resp, body) {
                                                                if (err) {
                                                                    ko(err);
                                                                } else {
                                                                    var parsed_body = JSON.parse(body);
                                                                    ok(parsed_body);
                                                                }
                                                            });
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context8.stop();
                                                }
                                            }
                                        }, _callee8, _this5);
                                    }));

                                    return function (_x7, _x8) {
                                        return _ref9.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function registered() {
                return _ref8.apply(this, arguments);
            }

            return registered;
        }()
    }, {
        key: "refresh_wallets",
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var _this6 = this;

                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                return _context11.abrupt("return", new Promise(function () {
                                    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ok, ko) {
                                        var challenge, signature;
                                        return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                            while (1) {
                                                switch (_context10.prev = _context10.next) {
                                                    case 0:
                                                        _context10.prev = 0;

                                                        if (!_this6.token) {
                                                            _context10.next = 5;
                                                            break;
                                                        }

                                                        _this6.request.post({ url: _this6.url + "/refresh_wallets", followAllRedirects: true, jar: true, form: { address: _this6.coinbase } }, function (err, resp, body) {
                                                            if (err) {
                                                                ko(err);
                                                            } else {
                                                                var parsed_body = JSON.parse(body);
                                                                ok(parsed_body);
                                                            }
                                                        });
                                                        _context10.next = 12;
                                                        break;

                                                    case 5:
                                                        _context10.next = 7;
                                                        return _this6.challenge();

                                                    case 7:
                                                        challenge = _context10.sent;
                                                        _context10.next = 10;
                                                        return _this6.signChallenge(challenge);

                                                    case 10:
                                                        signature = _context10.sent;

                                                        _this6.request.post({ url: _this6.url + "/login", followAllRedirects: true, jar: true, form: { address: _this6.coinbase, signature: signature } }, function (err, resp, body) {
                                                            if (err) {
                                                                ko(err);
                                                            } else {
                                                                _this6.token = signature;
                                                                _this6.request.post({ url: _this6.url + "/refresh_wallets", followAllRedirects: true, jar: true, form: { address: _this6.coinbase } }, function (err, resp, body) {
                                                                    if (err) {
                                                                        ko(err);
                                                                    } else {
                                                                        var parsed_body = JSON.parse(body);
                                                                        ok(parsed_body);
                                                                    }
                                                                });
                                                            }
                                                        });

                                                    case 12:
                                                        _context10.next = 17;
                                                        break;

                                                    case 14:
                                                        _context10.prev = 14;
                                                        _context10.t0 = _context10["catch"](0);

                                                        ko(_context10.t0);

                                                    case 17:
                                                    case "end":
                                                        return _context10.stop();
                                                }
                                            }
                                        }, _callee10, _this6, [[0, 14]]);
                                    }));

                                    return function (_x9, _x10) {
                                        return _ref11.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function refresh_wallets() {
                return _ref10.apply(this, arguments);
            }

            return refresh_wallets;
        }()
    }, {
        key: "signChallenge",
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(challenge) {
                var _this7 = this;

                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                return _context12.abrupt("return", new Promise(function (ok, ko) {
                                    var msgParams = [{
                                        type: 'string',
                                        name: 'challenge',
                                        value: challenge
                                    }];
                                    try {
                                        _this7.web3.currentProvider.sendAsync({
                                            method: 'eth_signTypedData',
                                            params: [msgParams, _this7.coinbase]
                                        }, function (err, result) {
                                            console.log(err, result);
                                            if (err) {
                                                ko(err);
                                            } else {
                                                ok(result.result);
                                            }
                                        });
                                    } catch (e) {
                                        ko(e);
                                    }
                                }));

                            case 1:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function signChallenge(_x11) {
                return _ref12.apply(this, arguments);
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