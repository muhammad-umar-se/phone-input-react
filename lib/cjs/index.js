"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneInput = void 0;
var react_1 = __importStar(require("react"));
var constants_1 = require("../src/constants");
var CountryDetails_1 = require("../src/CountryDetails");
var libphonenumber_js_1 = require("libphonenumber-js");
var IconArrowDown_1 = __importDefault(require("./assets/IconArrowDown"));
var PhoneInput = function (input) {
    var phoneNumber = input.phoneNumber, setPhoneNumber = input.setPhoneNumber;
    var _a = (0, react_1.useState)(false), displayList = _a[0], setDisplayList = _a[1];
    var _b = (0, react_1.useState)(""), flag = _b[0], setFlag = _b[1];
    var _c = (0, react_1.useState)(false), isFlagSelected = _c[0], setIsFlagSelected = _c[1];
    var _d = (0, react_1.useState)(false), isActive = _d[0], setIsActive = _d[1];
    (0, react_1.useEffect)(function () {
        if (!phoneNumber.length)
            setFlag((0, constants_1.flagUrl)("us"));
        var callingCode = "+".concat(String(phoneNumber).replace(constants_1.removeSpace, ""));
        var getCountryCode = (0, libphonenumber_js_1.formatIncompletePhoneNumber)(callingCode).split(" ");
        var findFlag = CountryDetails_1.countryDetails.find(function (item) {
            return (item === null || item === void 0 ? void 0 : item.countryCallingCode) ===
                (isFlagSelected ? callingCode : getCountryCode[0]);
        });
        if (findFlag) {
            setFlag((0, constants_1.flagUrl)(findFlag === null || findFlag === void 0 ? void 0 : findFlag.countryCode));
            setDisplayList(false);
        }
    }, [phoneNumber, isFlagSelected]);
    var specifiedElement = document.getElementById("Flags");
    document.addEventListener("click", function (event) {
        var isClickInside = specifiedElement === null || specifiedElement === void 0 ? void 0 : specifiedElement.contains(event.target);
        if (!isClickInside) {
            setDisplayList(false);
        }
        else {
            setDisplayList(true);
        }
    });
    var handleInputOnChange = function (e) {
        var value = e.target.value.replace(constants_1.removeSpace, "");
        if (value === "" || constants_1.phoneNoReg.test(value)) {
            setPhoneNumber(value);
        }
    };
    var handleInputOnPaste = function (event) {
        var callingCode = "+".concat(event.clipboardData.getData("Text").slice(0, 4));
        var trimCallingCode = "";
        for (var _i = 0, callingCode_1 = callingCode; _i < callingCode_1.length; _i++) {
            var item = callingCode_1[_i];
            trimCallingCode = trimCallingCode + item;
            var country = CountryDetails_1.countryDetails.find(function (item) { return (item === null || item === void 0 ? void 0 : item.countryCallingCode) === trimCallingCode; });
            if (country) {
                setFlag((0, constants_1.flagUrl)(country === null || country === void 0 ? void 0 : country.countryCode));
            }
        }
    };
    return (react_1.default.createElement("div", { className: "w-100" },
        react_1.default.createElement("div", { className: "phone-number-field ".concat(isActive ? "phone-number-field__active" : "") },
            react_1.default.createElement("img", { alt: "NF", src: flag, className: "phone-number-field__menu__item__img rounded" }),
            react_1.default.createElement("button", { className: "phone-number-field__button", type: "button", id: "Flags", onClick: function () {
                    setDisplayList(!displayList);
                } },
                react_1.default.createElement(IconArrowDown_1.default, null)),
            react_1.default.createElement("span", { className: "subtitle-3 ml-1 ".concat(phoneNumber ? "font-color-black" : "grey-color-text") }, "+"),
            react_1.default.createElement("input", { onFocus: function () { return setIsActive(true); }, onBlur: function () { return setIsActive(false); }, maxLength: 15, placeholder: "123 456 7891", className: "phone-number-field__input", value: phoneNumber
                    ? (0, libphonenumber_js_1.formatIncompletePhoneNumber)("+" + String(phoneNumber)).replace("+", "")
                    : "", onChange: function (e) {
                    phoneNumber.length < 4 && setIsFlagSelected(false);
                    handleInputOnChange(e);
                }, onPaste: function (event) {
                    handleInputOnPaste(event);
                }, type: "text" })),
        react_1.default.createElement("div", { className: "phone-number-field__menu ".concat(displayList ? "d-block" : "d-none") }, CountryDetails_1.countryDetails.map(function (item) {
            return (react_1.default.createElement("div", { key: (item === null || item === void 0 ? void 0 : item.countryCode) + (item === null || item === void 0 ? void 0 : item.countryName), onClick: function () {
                    setPhoneNumber(parseInt(item === null || item === void 0 ? void 0 : item.countryCallingCode));
                    setIsFlagSelected(true);
                }, className: "phone-number-field__menu__item" },
                react_1.default.createElement("img", { alt: "flag", src: (0, constants_1.flagUrl)(item === null || item === void 0 ? void 0 : item.countryCode), className: "phone-number-field__menu__item__img rounded" }),
                react_1.default.createElement("span", { className: "phone-number-field__menu__item__country-name text-truncate" }, item === null || item === void 0 ? void 0 : item.countryName),
                react_1.default.createElement("span", { className: "phone-number-field__menu__item__country-code ml-2" },
                    "(", item === null || item === void 0 ? void 0 :
                    item.countryCallingCode,
                    ")")));
        }))));
};
exports.PhoneInput = PhoneInput;
