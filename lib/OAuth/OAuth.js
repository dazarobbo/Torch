"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Token = require("./Token.js");

var _Token2 = _interopRequireDefault(_Token);

var _AccessToken = require("./AccessToken.js");

var _AccessToken2 = _interopRequireDefault(_AccessToken);

var _RefreshToken = require("./RefreshToken.js");

var _RefreshToken2 = _interopRequireDefault(_RefreshToken);

var _Code = require("./Code.js");

var _Code2 = _interopRequireDefault(_Code);

var _State = require("./State.js");

var _State2 = _interopRequireDefault(_State);

var _PlatformError = require("../PlatformError.js");

var _PlatformError2 = _interopRequireDefault(_PlatformError);

var _bignumber = require("bignumber.js");

var _bignumber2 = _interopRequireDefault(_bignumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * OAuth
 */
var OAuth = function () {
  function OAuth(p) {
    _classCallCheck(this, OAuth);

    this._platform = p;
  }

  /**
   * Takes a bungienetplatformjs Response containing a refresh and access token
   * and returns the objects
   * @param {BungieNet.Response} r - top-level response object
   * @return {Object} containing two properties: accessToken and refreshToken
   */


  _createClass(OAuth, [{
    key: "getRefreshToken",


    /**
     * Use to obtain a refresh and access token when using an authorisation code
     * from a user
     * @param {Code|String} code - authorisation code from the user
     * @return {Object} containing two properties: accessToken and refreshToken
     */
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(code) {
        var r;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._platform.getAccessTokensFromCode(code.toString());

              case 2:
                r = _context.sent;
                return _context.abrupt("return", OAuth._parseTokenResponse(r));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRefreshToken(_x) {
        return _ref.apply(this, arguments);
      }

      return getRefreshToken;
    }()

    /**
     * Use to obtain a new access token and refresh token based on an existing
     * refresh token
     * @param {RefreshToken|String} refreshToken - refresh token for a user
     * @return {Object} containing two properties: accessToken and refreshToken
     */

  }, {
    key: "getAccessToken",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(refreshToken) {
        var strToken, r;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                strToken = refreshToken.toString();
                _context2.next = 3;
                return this._platform.getAccessTokensFromRefreshToken(strToken);

              case 3:
                r = _context2.sent;
                return _context2.abrupt("return", OAuth._parseTokenResponse(r));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAccessToken(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getAccessToken;
    }()
  }], [{
    key: "_parseTokenResponse",
    value: function _parseTokenResponse(r) {

      var now = Date.now();
      var at = new OAuth.AccessToken();
      var rt = new OAuth.RefreshToken();

      if (r.isError) {
        throw _PlatformError2.default.fromResponse(r);
      }

      at.fromJSON(r.response.accessToken);
      rt.fromJSON(r.response.refreshToken);

      at.scope = new _bignumber2.default(r.response.scope);
      rt.scope = new _bignumber2.default(r.response.scope);

      at.created = now;
      rt.created = now;

      return {
        accessToken: at,
        refreshToken: rt
      };
    }
  }]);

  return OAuth;
}();

exports.default = OAuth;


OAuth.Token = _Token2.default;
OAuth.AccessToken = _AccessToken2.default;
OAuth.RefreshToken = _RefreshToken2.default;
OAuth.Code = _Code2.default;
OAuth.State = _State2.default;