"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import BungieNet from "bungienetplatformjs";
//import Common from "./Common.js";


var _OAuth = require("./OAuth/OAuth.js");

var _OAuth2 = _interopRequireDefault(_OAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Torch
 */
var Torch = function () {

  /**
   * @param {BungieNet.Platform} p - BungieNet.Platform instance
   */
  function Torch(p) {
    _classCallCheck(this, Torch);

    this._platform = p;
    this.OAuth = new _OAuth2.default(p);
  }

  _createClass(Torch, [{
    key: "ok",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var r;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._platform.helloWorld();

              case 2:
                r = _context.sent;
                return _context.abrupt("return", !r.isError);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ok() {
        return _ref.apply(this, arguments);
      }

      return ok;
    }()
  }]);

  return Torch;
}();

exports.default = Torch;