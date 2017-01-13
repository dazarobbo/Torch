"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tag = require("./Tag.js");

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Post = function () {
  function Post(raw) {
    _classCallCheck(this, Post);

    this._raw = raw;

    this._created = new Date(raw.creationDate);
    this._edited = new Date(raw.lastModified);
    this._lastReplied = new Date(raw.lastReplyDate);

    this._tags = _Tag2.default.fromArray(raw.tags);
  }

  _createClass(Post, [{
    key: "prop",
    value: function prop(name) {
      return this._raw[name];
    }
  }, {
    key: "author",
    get: function get() {
      return this._author;
    },
    set: function set(a) {
      this._author = a;
    }
  }, {
    key: "created",
    get: function get() {
      return this._created;
    }
  }]);

  return Post;
}();

exports.default = Post;