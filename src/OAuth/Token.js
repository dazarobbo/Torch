import Common from "../Common.js";

/**
 * Token
 */
export default class Token {

  constructor() {

    /**
     * @type {String}
     */
    this.value = null;

    /**
     * Epoch; milliseconds since 1970-01-01
     * @type {Number}
     */
    this.created = null;

    /**
     * Seconds ahead of creation time when ready
     * @type {Number}
     */
    this.readyin = null;

    /**
     * Seconds ahead of creation time when expired
     * @type {[type]}
     */
    this.expires = null;

    /**
     * OAuth access scope
     * @type {String|BigNumber}
     */
    this.scope = null;

  }

  get expired() {
    return (this.created / Token.MILLISECONDS) + this.expires >= Date.now() / Token.MILLISECONDS;
  }

  get ready() {
    return (this.created / Token.MILLISECONDS) + this.readyin >= Date.now() / Token.MILLISECONDS;
  }

  get valid() {
    return this.ready && !this.expired;
  }

  fromJSON(o) {
    Common.fromJSON(this, o);
  }

  toString() {
    return this.value;
  }

}

Token.MILLISECONDS = 1000;
