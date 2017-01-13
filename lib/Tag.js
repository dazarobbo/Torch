"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @example
 *
 * let t = new Torch.Tag("#Bungie");
 *
 * t.hash; //#bungie
 * t.raw; //Bungie
 * t.toString(); //#bungie
 */
var Tag = function () {
  function Tag(str) {
    _classCallCheck(this, Tag);

    this._tag = Tag._trim(str);
  }

  /**
   * Trims and removes non-tag characters, including "#"
   * @param {String} str -
   * @return {String} replaced string
   */


  _createClass(Tag, [{
    key: "toString",


    /**
     * @return {String} tag as a string without a "#"
     */
    value: function toString() {
      return this._tag.toLowerCase();
    }
  }, {
    key: "raw",


    /**
     * @return {String} the raw input string
     */
    get: function get() {
      return this._tag;
    }

    /**
     * @return {String} tag with a "#" (ie. "#bungie")
     */

  }, {
    key: "hash",
    get: function get() {
      return "#" + this.toString();
    }
  }], [{
    key: "_trim",
    value: function _trim(str) {
      return str.trim().replace("#", "");
    }

    /**
     * Returns an array of Tag from an array of strings
     * @param {String[]} arr - array of strings containing tags
     * @return {Tag[]} -
     */

  }, {
    key: "fromArray",
    value: function fromArray(arr) {
      return arr.map(function (t) {
        return new Tag(t);
      });
    }

    /**
     * Parses a string containing one or more tags separated by "#" or ","
     * @param {String} str - string to parse
     * @return {Tag[]} array containing Tag instances
     */

  }, {
    key: "fromString",
    value: function fromString(str) {
      var re = /([^\s|#|,]+)/g;
      var matches = str.match(re);
      return matches.map(function (m) {
        return new Tag(m);
      });
    }
  }]);

  return Tag;
}();

exports.default = Tag;