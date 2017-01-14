"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Post2 = require("./Post.js");

var _Post3 = _interopRequireDefault(_Post2);

var _Common = require("./Common.js");

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecruitmentPost = function (_Post) {
  _inherits(RecruitmentPost, _Post);

  function RecruitmentPost() {
    _classCallCheck(this, RecruitmentPost);

    return _possibleConstructorReturn(this, (RecruitmentPost.__proto__ || Object.getPrototypeOf(RecruitmentPost)).apply(this, arguments));
  }

  return RecruitmentPost;
}(_Post3.default);

exports.default = RecruitmentPost;