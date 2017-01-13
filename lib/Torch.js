"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bungienetplatformjs = require("bungienetplatformjs");

var _bungienetplatformjs2 = _interopRequireDefault(_bungienetplatformjs);

var _OAuth = require("./OAuth/OAuth.js");

var _OAuth2 = _interopRequireDefault(_OAuth);

var _Tag = require("./Tag.js");

var _Tag2 = _interopRequireDefault(_Tag);

var _PlatformError = require("./PlatformError.js");

var _PlatformError2 = _interopRequireDefault(_PlatformError);

var _Post = require("./Post.js");

var _Post2 = _interopRequireDefault(_Post);

var _BasicUser = require("./BasicUser.js");

var _BasicUser2 = _interopRequireDefault(_BasicUser);

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

    /**
     * @param {Tag[]|String} tags - array of tags or string containing tags
     * @param {Number} page - 0-based page
     * @param {BungieNet.enums.forumTopicsSort} sort -
     * @return {Response} -
     */

  }, {
    key: "getTopics",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Torch.FORUM_SORT;

        var _tags, topicArr, r, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, topic;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _tags = tags;
                topicArr = [];


                if (typeof tags === "string") {
                  _tags = _Tag2.default.fromString(tags);
                }

                _context2.next = 5;
                return this._platform.getTopicsPaged({
                  tagString: _tags.map(function (t) {
                    return t.toString();
                  }).join(","),
                  page: page,
                  pageSize: Torch.FORUM_PAGE_SIZE,
                  sort: sort,
                  group: Torch.NO_GROUP_ID,
                  quickDate: Torch.FORUM_QUICK_DATE,
                  categoryFilter: Torch.FORUM_CATEGORY
                });

              case 5:
                r = _context2.sent;

                if (!r.isError) {
                  _context2.next = 8;
                  break;
                }

                throw _PlatformError2.default.fromResponse(r);

              case 8:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 11;


                for (_iterator = r.response.results[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  topic = _step.value;

                  topicArr.push(Torch._parseTopicResponse(topic, r.response));
                }

                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](11);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 19:
                _context2.prev = 19;
                _context2.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context2.prev = 22;

                if (!_didIteratorError) {
                  _context2.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context2.finish(22);

              case 26:
                return _context2.finish(19);

              case 27:
                return _context2.abrupt("return", topicArr);

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[11, 15, 19, 27], [20,, 22, 26]]);
      }));

      function getTopics() {
        return _ref2.apply(this, arguments);
      }

      return getTopics;
    }()
  }], [{
    key: "_parseTopicResponse",
    value: function _parseTopicResponse(t, response) {

      var topic = new _Post2.default(t);

      topic.author = new _BasicUser2.default(response.authors.filter(function (a) {
        return a.membershipId === t.authorMembershipId;
      })[0]);

      return topic;
    }
  }]);

  return Torch;
}();

exports.default = Torch;


Torch.FORUM_PAGE_SIZE = 25;
Torch.FORUM_SORT = _bungienetplatformjs2.default.enums.forumTopicsSort.last_replied;
Torch.FORUM_QUICK_DATE = _bungienetplatformjs2.default.enums.forumTopicsQuickDate.all;
Torch.FORUM_CATEGORY = _bungienetplatformjs2.default.enums.forumTopicsCategoryFilters.none;
Torch.NO_GROUP_ID = 0;