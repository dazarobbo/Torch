import BungieNet from "bungienetplatformjs";
import OAuth from "./OAuth/OAuth.js";
import Tag from "./Tag.js";
import PlatformError from "./PlatformError.js";

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

    if(typeof tags === "string") {
      _tags = Tag.fromString(tags);
    }

    const r = await this._platform.getTopicsPaged({
      tagstring: _tags.map(t => t.toString()).join(","),
      page,
      sort,
      pageSize: Torch.TOPIC_PAGE_SIZE
    });

    if(r.isError) {
      throw PlatformError.fromResponse(r);
    }

    //parse response into objects and return

  }

}

Torch.TOPIC_PAGE_SIZE = 25;
Torch.FORUM_SORT = BungieNet.enums.forumTopicsSort.last_replied;
