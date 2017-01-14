import BungieNet from "bungienetplatformjs";
import fs from "fs";
import path from "path";
import request from "request";
import AdmZip from "adm-zip";
import tmp from "tmp";
import ContentDatabase from "./ContentDatabase.js";

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
   * Returns the hash for a filepath in the manifest according to the language
   * key
   * @param {String} lang - language key of hash to get
   * @return {String} hash
   */
  worldContentHash(lang) {
    const filename = path.basename(this.mobileWorldContentPaths[lang]);
    return ContentDatabase.parseHash(filename);
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
   * Downloads the content at the given url and saves it into a temporary file
   * @param {String} url -
   * @return {String} path to temp file
   */
  static downloadContent(url) {
    return new Promise((resolve, reject) => {
      tmp.file((fErr, fPath) => {

        if(fErr) {
          return reject(fErr);
        }

        request({ url, encoding: null })
          .on("error", netErr => reject(netErr))
          .pipe(fs.createWriteStream(fPath))
          .on("finish", () => resolve(fPath));

      });
    });
  }

  /**
   * Creates a temporary directory and extracts the first entry from the zip
   * into it
   * @param {String} file - path to zip file
   * @return {String} path to temp file containing content
   */
  static unzipContent(file) {
    return new Promise((resolve, reject) => {
      tmp.dir((dirErr, dirPath) => {

        if(dirErr) {
          return reject(dirErr);
        }

        const zip = new AdmZip(file);
        const entry = zip.getEntries()[0];
        const oPath = path.join(dirPath, entry.entryName);

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
