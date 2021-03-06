import OAuth from "./OAuth/OAuth.js";

/**
 * Torch
 */
export default class Torch {

  /**
   * @param {BungieNet.Platform} p - BungieNet.Platform instance
   */
  constructor(p) {
    this._platform = p;
    this.oAuth = new OAuth(p);
  }

  async ok() {
    const r = await this._platform.helloWorld();
    return !r.isError;
  }

}
