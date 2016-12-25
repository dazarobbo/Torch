"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * OAuth
 */
var Code = function () {

  /**
   * This is the code returned by bungie.net after a user authorises an app
   * @example "9229e57fe21932f05c14aa887d44f17a"
   * @param {String} code -
   */
  function Code(code) {
    _classCallCheck(this, Code);

    this.code = code;
  }

  /**
   * @return {String} code
   */


  _createClass(Code, [{
    key: "toString",
    value: function toString() {
      return this.code;
    }
  }]);

  return Code;
}();

exports.default = Code;