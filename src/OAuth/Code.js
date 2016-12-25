/**
 * OAuth
 */
export default class Code {

  /**
   * This is the code returned by bungie.net after a user authorises an app
   * @example "9229e57fe21932f05c14aa887d44f17a"
   * @param {String} code -
   */
  constructor(code) {
    this.code = code;
  }

  /**
   * @return {String} code
   */
  toString() {
    return this.code;
  }

}
