export default class Common {

  /**
   * Assigns values from object to target according to which properties exist
   * in both. Copies are shallow and only "surface-copies" are performed - a
   * deeply nested object will only have its topmost-accessible properties
   * considered
   *
   * @param {*} target - object to copy values to
   * @param {*} object - object to copy values from
   * @return {*} the target is returned
   */
  static fromJSON(target, object) {

    for(const prop in target) {
      if(prop in target) {
        target[prop] = object[prop];
      }
    }

    return target;

  }

}
