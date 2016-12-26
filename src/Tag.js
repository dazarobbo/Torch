/**
 * @example
 *
 * let t = new Torch.Tag("#Bungie");
 *
 * t.hash; //#bungie
 * t.raw; //Bungie
 * t.toString(); //#bungie
 */
export default class Tag {

  constructor(str) {
    this._tag = Tag._trim(str);
  }

  /**
   * Trims and removes non-tag characters, including "#"
   * @param {String} str -
   * @return {String} replaced string
   */
  static _trim(str) {
    return str.trim().replace("#", "");
  }

  /**
   * Returns an array of Tag from an array of strings
   * @param {String[]} arr - array of strings containing tags
   * @return {Tag[]} -
   */
  static fromArray(arr) {
    return arr.map(t => new Tag(t));
  }

  /**
   * Parses a string containing one or more tags separated by "#" or ","
   * @param {String} str - string to parse
   * @return {Tag[]} array containing Tag instances
   */
  static fromString(str) {
    const re = /([^\s|#|,]+)/g;
    const matches = str.match(re);
    return matches.map(m => new Tag(m));
  }

  /**
   * @return {String} the raw input string
   */
  get raw() {
    return this._tag;
  }

  /**
   * @return {String} tag with a "#" (ie. "#bungie")
   */
  get hash() {
    return `#${ this.toString() }`;
  }

  /**
   * @return {String} tag as a string without a "#"
   */
  toString() {
    return this._tag.toLowerCase();
  }

}
