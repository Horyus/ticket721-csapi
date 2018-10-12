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

var request = require('request');

var T721CSAPI = exports.T721CSAPI = function () {
    function T721CSAPI(url, coinbase, web3) {
        _classCallCheck(this, T721CSAPI);

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
                                    _this.request.post({ url: _this.url + "/challenge", jar: true, form: { address: _this.coinbase } }, function (err, resp, body) {
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                return _context4.abrupt("return", new Promise(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ok, ko) {
                                        var challenge, signature;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.prev = 0;
                                                        _context3.next = 3;
                                                        return _this2.challenge();

                                                    case 3:
                                                        challenge = _context3.sent;
                                                        _context3.next = 6;
                                                        return _this2.signChallenge(challenge);

                                                    case 6:
                                                        signature = _context3.sent;

                                                        _this2.request.post({ url: _this2.url + "/register", followAllRedirects: true, form: { address: _this2.coinbase, signature: signature } }, function () {
                                                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, resp, body) {
                                                                var parsed_body;
                                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                    while (1) {
                                                                        switch (_context2.prev = _context2.next) {
                                                                            case 0:
                                                                                if (!err) {
                                                                                    _context2.next = 4;
                                                                                    break;
                                                                                }

                                                                                ko(err);
                                                                                _context2.next = 20;
                                                                                break;

                                                                            case 4:
                                                                                parsed_body = JSON.parse(body);

                                                                                if (!compareAddress(parsed_body.address, _this2.coinbase)) {
                                                                                    _context2.next = 19;
                                                                                    break;
                                                                                }

                                                                                _context2.prev = 6;
                                                                                _context2.t0 = ok;
                                                                                _context2.next = 10;
                                                                                return _this2.connect(signature);

                                                                            case 10:
                                                                                _context2.t1 = _context2.sent;
                                                                                (0, _context2.t0)(_context2.t1);
                                                                                _context2.next = 17;
                                                                                break;

                                                                            case 14:
                                                                                _context2.prev = 14;
                                                                                _context2.t2 = _context2["catch"](6);

                                                                                ko(_context2.t2);

                                                                            case 17:
                                                                                _context2.next = 20;
                                                                                break;

                                                                            case 19:
                                                                                ko(new Error("Invalid returned address"));

                                                                            case 20:
                                                                            case "end":
                                                                                return _context2.stop();
                                                                        }
                                                                    }
                                                                }, _callee2, _this2, [[6, 14]]);
                                                            }));

                                                            return function (_x3, _x4, _x5) {
                                                                return _ref4.apply(this, arguments);
                                                            };
                                                        }());
                                                        _context3.next = 13;
                                                        break;

                                                    case 10:
                                                        _context3.prev = 10;
                                                        _context3.t0 = _context3["catch"](0);

                                                        ko(_context3.t0);

                                                    case 13:
                                                    case "end":
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this2, [[0, 10]]);
                                    }));

                                    return function (_x, _x2) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function register() {
                return _ref2.apply(this, arguments);
            }

            return register;
        }()
    }, {
        key: "check_token",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_token) {
                var _this3 = this;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                return _context6.abrupt("return", new Promise(function () {
                                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        try {
                                                            _this3.request.get({ url: _this3.url + "/check_token", followAllRedirects: true, headers: { 'Authorization': 'bearer ' + _token } }, function (err, resp, body) {
                                                                if (err) {
                                                                    ko(err);
                                                                } else {
                                                                    if (resp.statusCode === 200) {
                                                                        _this3.token = _token;
                                                                    }
                                                                    ok(resp.statusCode === 200);
                                                                }
                                                            });
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, _this3);
                                    }));

                                    return function (_x7, _x8) {
                                        return _ref6.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function check_token(_x6) {
                return _ref5.apply(this, arguments);
            }

            return check_token;
        }()
    }, {
        key: "connect",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_signature) {
                var _this4 = this;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                return _context8.abrupt("return", new Promise(function () {
                                    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ok, ko) {
                                        var challenge;
                                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                            while (1) {
                                                switch (_context7.prev = _context7.next) {
                                                    case 0:
                                                        _context7.prev = 0;

                                                        if (!_this4.token) {
                                                            _context7.next = 5;
                                                            break;
                                                        }

                                                        ok(true);
                                                        _context7.next = 13;
                                                        break;

                                                    case 5:
                                                        if (_signature) {
                                                            _context7.next = 12;
                                                            break;
                                                        }

                                                        _context7.next = 8;
                                                        return _this4.challenge();

                                                    case 8:
                                                        challenge = _context7.sent;
                                                        _context7.next = 11;
                                                        return _this4.signChallenge(challenge);

                                                    case 11:
                                                        _signature = _context7.sent;

                                                    case 12:
                                                        _this4.request.post({ url: _this4.url + "/login", followAllRedirects: true, form: { address: _this4.coinbase, signature: _signature } }, function (err, resp, body) {
                                                            if (err) {
                                                                ko(err);
                                                            } else {
                                                                var parsed_body = JSON.parse(body);
                                                                _this4.token = parsed_body.token;
                                                                ok(_this4.token);
                                                            }
                                                        });

                                                    case 13:
                                                        _context7.next = 18;
                                                        break;

                                                    case 15:
                                                        _context7.prev = 15;
                                                        _context7.t0 = _context7["catch"](0);

                                                        ko(_context7.t0);

                                                    case 18:
                                                    case "end":
                                                        return _context7.stop();
                                                }
                                            }
                                        }, _callee7, _this4, [[0, 15]]);
                                    }));

                                    return function (_x10, _x11) {
                                        return _ref8.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function connect(_x9) {
                return _ref7.apply(this, arguments);
            }

            return connect;
        }()
    }, {
        key: "get_infos",
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var _this5 = this;

                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                return _context10.abrupt("return", new Promise(function () {
                                    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                            while (1) {
                                                switch (_context9.prev = _context9.next) {
                                                    case 0:
                                                        try {
                                                            if (_this5.token) {
                                                                _this5.request.get({ url: _this5.url + "/", followAllRedirects: true, headers: { 'Authorization': 'bearer ' + _this5.token } }, function (err, resp, body) {
                                                                    if (err) {
                                                                        ko(err);
                                                                    } else {
                                                                        var parsed_body = JSON.parse(body);
                                                                        ok(parsed_body);
                                                                    }
                                                                });
                                                            } else {
                                                                _this5.request.get({ url: _this5.url + "/", followAllRedirects: true }, function (err, resp, body) {
                                                                    if (err) {
                                                                        ko(err);
                                                                    } else {
                                                                        var parsed_body = JSON.parse(body);
                                                                        ok(parsed_body);
                                                                    }
                                                                });
                                                            }
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context9.stop();
                                                }
                                            }
                                        }, _callee9, _this5);
                                    }));

                                    return function (_x12, _x13) {
                                        return _ref10.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function get_infos() {
                return _ref9.apply(this, arguments);
            }

            return get_infos;
        }()
    }, {
        key: "get_events",
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var _this6 = this;

                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                return _context12.abrupt("return", new Promise(function () {
                                    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                            while (1) {
                                                switch (_context11.prev = _context11.next) {
                                                    case 0:
                                                        try {
                                                            _this6.request.get({ url: _this6.url + "/get_events", followAllRedirects: true }, function (err, resp, body) {
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
                                                        return _context11.stop();
                                                }
                                            }
                                        }, _callee11, _this6);
                                    }));

                                    return function (_x14, _x15) {
                                        return _ref12.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function get_events() {
                return _ref11.apply(this, arguments);
            }

            return get_events;
        }()
    }, {
        key: "registered",
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                var _this7 = this;

                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                return _context14.abrupt("return", new Promise(function () {
                                    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                            while (1) {
                                                switch (_context13.prev = _context13.next) {
                                                    case 0:
                                                        try {
                                                            _this7.request.post({ url: _this7.url + "/registered", followAllRedirects: true, form: { address: _this7.coinbase } }, function (err, resp, body) {
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
                                                        return _context13.stop();
                                                }
                                            }
                                        }, _callee13, _this7);
                                    }));

                                    return function (_x16, _x17) {
                                        return _ref14.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function registered() {
                return _ref13.apply(this, arguments);
            }

            return registered;
        }()
    }, {
        key: "link_code",
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(address) {
                var _this8 = this;

                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                return _context16.abrupt("return", new Promise(function () {
                                    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee15$(_context15) {
                                            while (1) {
                                                switch (_context15.prev = _context15.next) {
                                                    case 0:
                                                        try {
                                                            _this8.request.post({ url: _this8.url + '/link_code', followAllRedirects: true, form: { address: address } }, function (err, resp, body) {
                                                                if (err) {
                                                                    ko(err);
                                                                } else {
                                                                    var parsed_body = JSON.parse(body);
                                                                    ok(parsed_body.code);
                                                                }
                                                            });
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context15.stop();
                                                }
                                            }
                                        }, _callee15, _this8);
                                    }));

                                    return function (_x19, _x20) {
                                        return _ref16.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function link_code(_x18) {
                return _ref15.apply(this, arguments);
            }

            return link_code;
        }()
    }, {
        key: "get_address_from_code",
        value: function () {
            var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(code) {
                var _this9 = this;

                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                return _context18.abrupt("return", new Promise(function () {
                                    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee17$(_context17) {
                                            while (1) {
                                                switch (_context17.prev = _context17.next) {
                                                    case 0:
                                                        try {
                                                            _this9.request.get({ url: _this9.url + '/link_code/' + code, followAllRedirects: true }, function (err, resp, body) {
                                                                if (err || resp.statusCode >= 500 && resp.statusCode < 600) {
                                                                    ko(err || resp.statusCode);
                                                                } else {
                                                                    var parsed_body = JSON.parse(body);
                                                                    ok(parsed_body.address);
                                                                }
                                                            });
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context17.stop();
                                                }
                                            }
                                        }, _callee17, _this9);
                                    }));

                                    return function (_x22, _x23) {
                                        return _ref18.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context18.stop();
                        }
                    }
                }, _callee18, this);
            }));

            function get_address_from_code(_x21) {
                return _ref17.apply(this, arguments);
            }

            return get_address_from_code;
        }()
    }, {
        key: "get_ticket_history",
        value: function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(id, verified) {
                var _this10 = this;

                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                return _context20.abrupt("return", new Promise(function () {
                                    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(ok, ko) {
                                        return regeneratorRuntime.wrap(function _callee19$(_context19) {
                                            while (1) {
                                                switch (_context19.prev = _context19.next) {
                                                    case 0:
                                                        try {
                                                            _this10.request.post({ url: _this10.url + '/get_history', followAllRedirects: true, form: { id: id, verified: verified } }, function (err, resp, body) {
                                                                console.log(err, resp, body);
                                                                if (err || resp.statusCode >= 500 && resp.statusCode < 600) {
                                                                    ko(err || resp.statusCode);
                                                                } else {
                                                                    var parsed_body = JSON.parse(body);
                                                                    ok(parsed_body.history);
                                                                }
                                                            });
                                                        } catch (e) {
                                                            ko(e);
                                                        }

                                                    case 1:
                                                    case "end":
                                                        return _context19.stop();
                                                }
                                            }
                                        }, _callee19, _this10);
                                    }));

                                    return function (_x26, _x27) {
                                        return _ref20.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case "end":
                                return _context20.stop();
                        }
                    }
                }, _callee20, this);
            }));

            function get_ticket_history(_x24, _x25) {
                return _ref19.apply(this, arguments);
            }

            return get_ticket_history;
        }()
    }, {
        key: "signChallenge",
        value: function () {
            var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(challenge) {
                var _this11 = this;

                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                return _context21.abrupt("return", new Promise(function (ok, ko) {
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
                                    var msgParams = [{
                                        type: 'string',
                                        name: 'challenge',
                                        value: challenge
                                    }];
                                    try {
                                        console.log(_this11.web3.currentProvider);
                                        _this11.web3.currentProvider.sendAsync({
                                            method: 'eth_signTypedData',
                                            params: [msgParams, _this11.coinbase],
                                            from: _this11.coinbase
                                        }, function (err, result) {
                                            if (err || result.error) {
                                                ko(err || result.error);
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
                                return _context21.stop();
                        }
                    }
                }, _callee21, this);
            }));

            function signChallenge(_x28) {
                return _ref21.apply(this, arguments);
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