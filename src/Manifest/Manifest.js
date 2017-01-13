import BungieNet from "bungienetplatformjs";
import fs from "fs";
import request from "request";
import AdmZip from "adm-zip";
import tmp from "tmp";

/**
 *
 */
export default class Manifest {

  /**
   * Takes a manifest response from bungie.net and returns a Manifest object
   * @param {Response} resp - bungienetplatformjs response
   * @return {Manifest} manifest instance
   */
  static fromResponse(resp) {

    const m = new Manifest();

    for(const prop in resp) {
      if(resp.hasOwnProperty(prop)) {
        m[prop] = resp[prop];
      }
    }

    return m;

  }

  /**
   * @param {String} lang - language key of content to download
   * @return {String} path to temp sqlite file
   */
  async downloadWorldContent(lang) {
    const url = BungieNet.base.segment(this.mobileWorldContentPaths[lang]);
    const zipPath = await Manifest.downloadContent(url.toString());
    return Manifest.unzipContent(zipPath);
  }

  /**
   * @param {String} url -
   * @return {String} path to temp zip file
   */
  static downloadContent(url) {
    return new Promise((resolve, reject) => {
      tmp.file((fErr, zipPath) => {

        if(fErr) {
          return reject(fErr);
        }

        request({ url, encoding: null })
          .on("error", netErr => reject(netErr))
          .pipe(fs.createWriteStream(zipPath))
          .on("finish", () => resolve(zipPath));

      });
    });
  }

  /**
   * @param {String} file - path to zip file
   * @return {String} path to temp file containing content
   */
  static unzipContent(file) {
    return new Promise((resolve, reject) => {
      tmp.file((fErr, oPath) => {

        if(fErr) {
          return reject(fErr);
        }

        const zip = new AdmZip(file);
        const entry = zip.getEntries()[0];

        zip.readFileAsync(entry, buff => {
          fs.writeFile(oPath, buff, err => {

            if(err) {
              return reject(err);
            }

            return resolve(oPath);

          });
        });

      });

    });
  }

}
