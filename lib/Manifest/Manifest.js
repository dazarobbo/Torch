"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bungienetplatformjs = require("bungienetplatformjs");

var _bungienetplatformjs2 = _interopRequireDefault(_bungienetplatformjs);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _admZip = require("adm-zip");

var _admZip2 = _interopRequireDefault(_admZip);

var _tmp = require("tmp");

var _tmp2 = _interopRequireDefault(_tmp);

var _ContentDatabase = require("./ContentDatabase.js");

var _ContentDatabase2 = _interopRequireDefault(_ContentDatabase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var Manifest = function () {
  function Manifest() {
    _classCallCheck(this, Manifest);
  }

  _createClass(Manifest, [{
    key: "worldContentHash",


    /**
     * Returns the hash for a filepath in the manifest according to the language
     * key
     * @param {String} lang - language key of hash to get
     * @return {String} hash
     */
    value: function worldContentHash(lang) {
      var filename = _path2.default.basename(this.mobileWorldContentPaths[lang]);
      return _ContentDatabase2.default.parseHash(filename);
    }

    /**
     * @param {String} lang - language key of content to download
     * @return {String} path to temp sqlite file
     */

  }, {
    key: "downloadWorldContent",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(lang) {
        var url, zipPath;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _bungienetplatformjs2.default.base.segment(this.mobileWorldContentPaths[lang]);
                _context.next = 3;
                return Manifest.downloadContent(url.toString());

              case 3:
                zipPath = _context.sent;
                return _context.abrupt("return", Manifest.unzipContent(zipPath));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function downloadWorldContent(_x) {
        return _ref.apply(this, arguments);
      }

      return downloadWorldContent;
    }()

    /**
     * Downloads the content at the given url and saves it into a temporary file
     * @param {String} url -
     * @return {String} path to temp file
     */

  }], [{
    key: "fromResponse",


    /**
     * Takes a manifest response from bungie.net and returns a Manifest object
     * @param {Response} resp - bungienetplatformjs response
     * @return {Manifest} manifest instance
     */
    value: function fromResponse(resp) {

      var m = new Manifest();

      for (var prop in resp) {
        if (resp.hasOwnProperty(prop)) {
          m[prop] = resp[prop];
        }
      }

      return m;
    }
  }, {
    key: "downloadContent",
    value: function downloadContent(url) {
      return new Promise(function (resolve, reject) {
        _tmp2.default.file(function (fErr, fPath) {

          if (fErr) {
            return reject(fErr);
          }

          (0, _request2.default)({ url: url, encoding: null }).on("error", function (netErr) {
            return reject(netErr);
          }).pipe(_fs2.default.createWriteStream(fPath)).on("finish", function () {
            return resolve(fPath);
          });
        });
      });
    }

    /**
     * Creates a temporary directory and extracts the first entry from the zip
     * into it
     * @param {String} file - path to zip file
     * @return {String} path to temp file containing content
     */

  }, {
    key: "unzipContent",
    value: function unzipContent(file) {
      return new Promise(function (resolve, reject) {
        _tmp2.default.dir(function (dirErr, dirPath) {

          if (dirErr) {
            return reject(dirErr);
          }

          var zip = new _admZip2.default(file);
          var entry = zip.getEntries()[0];
          var oPath = _path2.default.join(dirPath, entry.entryName);

          zip.readFileAsync(entry, function (buff) {
            _fs2.default.writeFile(oPath, buff, function (err) {

              if (err) {
                return reject(err);
              }

              return resolve(oPath);
            });
          });
        });
      });
    }
  }]);

  return Manifest;
}();

exports.default = Manifest;