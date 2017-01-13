import BungieNet from "bungienetplatformjs";
import OAuth from "./OAuth/OAuth.js";
import Tag from "./Tag.js";
import PlatformError from "./PlatformError.js";
import Post from "./Post.js";
import BasicUser from "./BasicUser.js";

/**
 * Torch
 */
export default class Torch {

  /**
   * @param {BungieNet.Platform} p - BungieNet.Platform instance
   */
  constructor(p) {
    this._platform = p;
    this.OAuth = new OAuth(p);
  }

  static _parseTopicResponse(t, response) {

    const topic = new Post(t);

    topic.author = new BasicUser(response
      .authors
      .filter(a => a.membershipId === t.authorMembershipId)[0]
    );

    return topic;

  }

  async ok() {
    const r = await this._platform.helloWorld();
    return !r.isError;
  }

  /**
   * @param {Tag[]|String} tags - array of tags or string containing tags
   * @param {Number} page - 0-based page
   * @param {BungieNet.enums.forumTopicsSort} sort -
   * @return {Response} -
   */
  async getTopics(tags = [], page = 0, sort = Torch.FORUM_SORT) {

    let _tags = tags;
    const topicArr = [];

    if(typeof tags === "string") {
      _tags = Tag.fromString(tags);
    }

    const r = await this._platform.getTopicsPaged({
      tagString: _tags.map(t => t.toString()).join(","),
      page,
      pageSize: Torch.FORUM_PAGE_SIZE,
      sort,
      group: Torch.NO_GROUP_ID,
      quickDate: Torch.FORUM_QUICK_DATE,
      categoryFilter: Torch.FORUM_CATEGORY
    });

    if(r.isError) {
      throw PlatformError.fromResponse(r);
    }

    for(const topic of r.response.results) {
      topicArr.push(Torch._parseTopicResponse(topic, r.response));
    }

    return topicArr;

  }

}

Torch.FORUM_PAGE_SIZE = 25;
Torch.FORUM_SORT = BungieNet.enums.forumTopicsSort.last_replied;
Torch.FORUM_QUICK_DATE = BungieNet.enums.forumTopicsQuickDate.all;
Torch.FORUM_CATEGORY = BungieNet.enums.forumTopicsCategoryFilters.none;
Torch.NO_GROUP_ID = 0;
