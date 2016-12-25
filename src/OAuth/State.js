import { randomBytes } from "crypto";

/**
 * State variable in OAuth transactions
 */
export default class State {

  /**
   * Call getInstance if you want a random token generated
   */
  constructor() {
    this._token = null;
  }

  static generateToken() {
    return randomBytes(State.BYTES_LEN);
  }

  static getInstance() {
    const state = new State();
    state._token = State.generateToken();
    return state;
  }

  static parse(s) {
    const state = new State();
    state._token = s;
    return state;
  }

  match(state) {
    return this._token === state._token;
  }

  get token() {
    return this._token;
  }

  /**
   * @return hex string
   */
  toString() {
    return this._token.toString("hex");
  }

}

State.BYTES_LEN = 32;
