import Tag from "./Tag.js";

export default class Post {

  constructor(raw) {

    this._raw = raw;

    this._created = new Date(raw.creationDate);
    this._edited = new Date(raw.lastModified);
    this._lastReplied = new Date(raw.lastReplyDate);

    this._tags = Tag.fromArray(raw.tags);

  }

  prop(name) {
    return this._raw[name];
  }

  get author() {
    return this._author;
  }

  set author(a) {
    this._author = a;
  }

  get created() {
    return this._created;
  }

}
