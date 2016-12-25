"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extendableErrorClass = require("extendable-error-class");

var _extendableErrorClass2 = _interopRequireDefault(_extendableErrorClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * PlatformError
 */
var PlatformError = function (_ExtendableError) {
    _inherits(PlatformError, _ExtendableError);

    function PlatformError() {
        _classCallCheck(this, PlatformError);

        return _possibleConstructorReturn(this, (PlatformError.__proto__ || Object.getPrototypeOf(PlatformError)).apply(this, arguments));
    }

    _createClass(PlatformError, null, [{
        key: "fromResponse",
        value: function fromResponse(r) {

            var e = new PlatformError(r.message);
            e.code = r.errorCode;
            e.status = r.errorStatus;

            return e;
        }
    }]);

    return PlatformError;
}(_extendableErrorClass2.default);

exports.default = PlatformError;