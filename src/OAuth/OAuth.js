import Token from "./Token.js";
import AccessToken from "./AccessToken.js";
import RefreshToken from "./RefreshToken.js";
import Code from "./Code.js";
import State from "./State.js";
import PlatformError from "../PlatformError.js";
import BigNumber from "bignumber.js";

/**
 * OAuth
 */
export default class OAuth {

  constructor(p) {
    this._platform = p;
  }

  /**
   * Takes a bungienetplatformjs Response containing a refresh and access token
   * and returns the objects
   * @param {BungieNet.Response} r - top-level response object
   * @return {Object} containing two properties: accessToken and refreshToken
   */
  static _parseTokenResponse(r) {

    const now = Date.now();
    const at = new OAuth.AccessToken();
    const rt = new OAuth.RefreshToken();

    if(r.isError) {
      throw PlatformError.fromResponse(r);
    }

    at.fromJSON(r.response.accessToken);
    rt.fromJSON(r.response.refreshToken);

    at.scope = new BigNumber(r.response.scope);
    rt.scope = new BigNumber(r.response.scope);

    at.created = now;
    rt.created = now;

    return {
      accessToken: at,
      refreshToken: rt
    };

  }

  /**
   * Use to obtain a refresh and access token when using an authorisation code
   * from a user
   * @param {Code|String} code - authorisation code from the user
   * @return {Object} containing two properties: accessToken and refreshToken
   */
  async getRefreshToken(code) {
    const r = await this._platform.getAccessTokensFromCode(code.toString());
    return OAuth._parseTokenResponse(r);
  }

  /**
   * Use to obtain a new access token and refresh token based on an existing
   * refresh token
   * @param {RefreshToken|String} refreshToken - refresh token for a user
   * @return {Object} containing two properties: accessToken and refreshToken
   */
  async getAccessToken(refreshToken) {
    const strToken = refreshToken.toString();
    const r = await this._platform.getAccessTokensFromRefreshToken(strToken);
    return OAuth._parseTokenResponse(r);
  }

}

OAuth.Token = Token;
OAuth.AccessToken = AccessToken;
OAuth.RefreshToken = RefreshToken;
OAuth.Code = Code;
OAuth.State = State;
