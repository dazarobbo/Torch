import Common from "./Common.js";

export default class Group {

  constructor() {

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

  fromJSON(o) {
    Common.fromJSON(this, o);
  }

}
