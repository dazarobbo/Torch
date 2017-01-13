"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Common = require("./Common.js");

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = function () {
  function Group() {
    _classCallCheck(this, Group);

    this.detail = null;
    this.founderMembershipId = null;
    this.founder = null;
    this.followerCount = null;
    this.currentUserStatus = null;
    this.alliedIds = null;
    this.attributes = null;
    this.membershipIds = null;
    this.clanMembershipTypes = null;
    this.allianceStatus = null;
    this.friends = null;
    this.groupJoinRequestCount = null;
    this.groupJoinInviteCount = null;
    this.clanJoinRequestCount = null;
    this.clanJoinInviteCount = null;
  }

  _createClass(Group, [{
    key: "fromJSON",
    value: function fromJSON(o) {
      _Common2.default.fromJSON(this, o);
    }
  }]);

  return Group;
}();

exports.default = Group;