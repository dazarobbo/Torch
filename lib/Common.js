"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tmp = require("tmp");

var _tmp2 = _interopRequireDefault(_tmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    _classCallCheck(this, Common);
  }

  _createClass(Common, null, [{
    key: "fromJSON",


    /**
     * Assigns values from object to target according to which properties exist
     * in both. Copies are shallow and only "surface-copies" are performed - a
     * deeply nested object will only have its topmost-accessible properties
     * considered
     *
     * @param {*} target - object to copy values to
     * @param {*} object - object to copy values from
     * @return {*} the target is returned
     */
    value: function fromJSON(target, object) {

      for (var prop in target) {
        if (prop in target) {
          target[prop] = object[prop];
        }
      }

      return target;
    }
  }, {
    key: "tempFile",
    value: function tempFile() {
      return new Promise(function (resolve, reject) {
        _tmp2.default.file(function (err, path, fd, cleanup) {

          if (err) {
            return reject();
          }

          return resolve(path);
        });
      });
    }
  }]);

  return Common;
}();

exports.default = Common;