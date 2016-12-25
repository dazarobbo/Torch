import ExtendableError from "extendable-error-class";

/**
 * PlatformError
 */
export default class PlatformError extends ExtendableError {

  static fromResponse(r) {

    const e = new PlatformError(r.message);
    e.code = r.errorCode;
    e.status = r.errorStatus;

    return e;

  }

}
