import Common from "./Common.js";

export default class BasicUser {

  constructor(raw) {
    this._raw = raw;
  }

  prop(name) {
    return this._raw[name];
  }

}
