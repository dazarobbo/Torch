"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sqlite = require("sqlite3");

var _sqlite2 = _interopRequireDefault(_sqlite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var ContentDatabase = function () {
  function ContentDatabase(sqlFile) {
    _classCallCheck(this, ContentDatabase);

    this.db = new _sqlite2.default.Database(sqlFile);
    this._initalised = false;
    this._tables = [];
  }

  _createClass(ContentDatabase, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      return new Promise(function (resolve, reject) {

        var sql = "SELECT tbl_name FROM sqlite_master WHERE type = 'table'";

        _this.db.all(sql, function (err, rows) {

          if (err) {
            return reject("database error");
          }

          _this._tables = rows.map(function (r) {
            return r.tbl_name;
          });
          _this._initalised = true;

          return resolve();
        });
      });
    }

    /**
     * Returns JSON content from a table according to a given id
     * @param {String} table - name of the table to query
     * @param {Number|Hash} id - id of the record to return
     * @return {Promise.<Object>} content
     */

  }, {
    key: "getContent",
    value: function getContent(table, id) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        _this2.db.get("SELECT json FROM " + table + " WHERE id = $id", {
          $id: parseInt(id.toString(), 10) & ContentDatabase.ID_MASK
        }, function (err, row) {

          if (err) {
            return reject(err);
          }

          if (!row || !("json" in row)) {
            return reject("no match for " + id + " in " + table);
          }

          return resolve(JSON.parse(row.json));
        });
      });
    }

    /**
     * Queries each table for a record matching the given id
     * @param {Number|Hash} id -
     * @return {Promise.<Object>} content
     */

  }, {
    key: "getAnyContent",
    value: function getAnyContent(id) {
      var _this3 = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, table;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_this3._initalised) {
                    _context.next = 3;
                    break;
                  }

                  _context.next = 3;
                  return _this3._init();

                case 3:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 6;
                  _iterator = _this3._tables[Symbol.iterator]();

                case 8:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 24;
                    break;
                  }

                  table = _step.value;
                  _context.prev = 10;
                  _context.t0 = resolve;
                  _context.next = 14;
                  return _this3.getContent(table, id);

                case 14:
                  _context.t1 = _context.sent;
                  return _context.abrupt("return", (0, _context.t0)(_context.t1));

                case 18:
                  _context.prev = 18;
                  _context.t2 = _context["catch"](10);
                  return _context.abrupt("continue", 21);

                case 21:
                  _iteratorNormalCompletion = true;
                  _context.next = 8;
                  break;

                case 24:
                  _context.next = 30;
                  break;

                case 26:
                  _context.prev = 26;
                  _context.t3 = _context["catch"](6);
                  _didIteratorError = true;
                  _iteratorError = _context.t3;

                case 30:
                  _context.prev = 30;
                  _context.prev = 31;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 33:
                  _context.prev = 33;

                  if (!_didIteratorError) {
                    _context.next = 36;
                    break;
                  }

                  throw _iteratorError;

                case 36:
                  return _context.finish(33);

                case 37:
                  return _context.finish(30);

                case 38:
                  return _context.abrupt("return", reject("no match found for " + id + " in any table"));

                case 39:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this3, [[6, 26, 30, 38], [10, 18], [31,, 33, 37]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return ContentDatabase;
}();

exports.default = ContentDatabase;


ContentDatabase.ID_MASK = 0xffffffff;