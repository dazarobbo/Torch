"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Common = require("../Common.js");

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Token
 */
var Token = function () {
  function Token() {
    _classCallCheck(this, Token);

    /**
     * @type {String}
     */
    this.value = null;

    /**
     * Epoch; milliseconds since 1970-01-01
     * @type {Number}
     */
    this.created = null;

    /**
     * Seconds ahead of creation time when ready
     * @type {Number}
     */
    this.readyin = null;

    /**
     * Seconds ahead of creation time when expired
     * @type {[type]}
     */
    this.expires = null;

    /**
     * OAuth access scope
     * @type {String|BigNumber}
     */
    this.scope = null;
  }

  _createClass(Token, [{
    key: "fromJSON",
    value: function fromJSON(o) {
      _Common2.default.fromJSON(this, o);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }, {
    key: "expired",
    get: function get() {
      return this.created / Token.MILLISECONDS + this.expires >= Date.now() / Token.MILLISECONDS;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.created / Token.MILLISECONDS + this.readyin >= Date.now() / Token.MILLISECONDS;
    }
  }, {
    key: "valid",
    get: function get() {
      return this.ready && !this.expired;
    }
  }]);

  return Token;
}();

exports.default = Token;


Token.MILLISECONDS = 1000;