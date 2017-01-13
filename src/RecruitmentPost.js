import Post from "./Post.js";
import Common from "./Common.js";

export default class RecruitmentPost extends Post {

  constructor() {

    super();

    this.microphoneRequired = null;
    this.intensity = null;
    this.tone = null;
    this.approved = null;
    this.playerSlotsTotal = null;
    this.playerSlotsRemaining = null;

  }

  fromJSON(o) {
    Common.fromJSON(this, o);
  }

}
