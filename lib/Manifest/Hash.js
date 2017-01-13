"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var Hash = function () {
  function Hash(val) {
    _classCallCheck(this, Hash);

    this._hash = parseInt(val, 10);
  }

  /**
   * @param {ContentDatabase} db - database to query if given
   * @return {Promise.<Object>} -
   */


  _createClass(Hash, [{
    key: "getContent",
    value: function getContent() {
      var db = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


      if (Hash.DATABASE) {
        return Hash.DATABASE.getAnyContent(this._hash);
      }

      if (db) {
        return db.getAnyContent(this._hash);
      }

      return Promise.reject("no content database available");
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._hash.toString();
    }
  }], [{
    key: "setDefaultDatabase",
    value: function setDefaultDatabase(db) {
      Hash.DATABASE = db;
    }
  }]);

  return Hash;
}();

exports.default = Hash;


Hash.DATABASE = null;