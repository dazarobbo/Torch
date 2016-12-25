"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require("crypto");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * State variable in OAuth transactions
 */
var State = function () {

  /**
   * Call getInstance if you want a random token generated
   */
  function State() {
    _classCallCheck(this, State);

    this._token = null;
  }

  _createClass(State, [{
    key: "match",
    value: function match(state) {
      return this._token === state._token;
    }
  }, {
    key: "toString",


    /**
     * @return hex string
     */
    value: function toString() {
      return this._token.toString("hex");
    }
  }, {
    key: "token",
    get: function get() {
      return this._token;
    }
  }], [{
    key: "generateToken",
    value: function generateToken() {
      return (0, _crypto.randomBytes)(State.BYTES_LEN);
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      var state = new State();
      state._token = State.generateToken();
      return state;
    }
  }, {
    key: "parse",
    value: function parse(s) {
      var state = new State();
      state._token = s;
      return state;
    }
  }]);

  return State;
}();

exports.default = State;


State.BYTES_LEN = 32;