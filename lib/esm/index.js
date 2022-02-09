import React, { useEffect, useState } from "react";
import { flagUrl, phoneNoReg, removeSpace } from "./constants/constants";
import { countryDetails } from "./constants/CountryDetails";
import { formatIncompletePhoneNumber } from "libphonenumber-js";
import IconArrowDown from "./assets/IconArrowDown";
import { style } from './assets/style';
export var PhoneInput = function (input) {
    var phoneNumber = input.phoneNumber, setPhoneNumber = input.setPhoneNumber, _a = input.defaultFlag, defaultFlag = _a === void 0 ? '' : _a, _b = input.startingSymbol, startingSymbol = _b === void 0 ? '+' : _b, _c = input.className, className = _c === void 0 ? '' : _c;
    var _d = useState(defaultFlag), flag = _d[0], setFlag = _d[1];
    var _e = useState(false), displayList = _e[0], setDisplayList = _e[1];
    var _f = useState(false), isFlagSelected = _f[0], setIsFlagSelected = _f[1];
    var _g = useState(false), isActive = _g[0], setIsActive = _g[1];
    useEffect(function () {
        if (!phoneNumber.length)
            setFlag(flagUrl("us"));
        var callingCode = "+".concat(String(phoneNumber).replace(removeSpace, ""));
        var getCountryCode = formatIncompletePhoneNumber(callingCode).split(" ");
        var findFlag = countryDetails.find(function (item) {
            return (item === null || item === void 0 ? void 0 : item.countryCallingCode) ===
                (isFlagSelected ? callingCode : getCountryCode[0]);
        });
        if (findFlag) {
            setFlag(flagUrl(findFlag === null || findFlag === void 0 ? void 0 : findFlag.countryCode));
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
        var value = e.target.value.replace(removeSpace, "");
        if (value === "" || phoneNoReg.test(value)) {
            setPhoneNumber(value);
        }
    };
    var handleInputOnPaste = function (event) {
        var callingCode = "+".concat(event.clipboardData.getData("Text").slice(0, 4));
        var trimCallingCode = "";
        for (var _i = 0, callingCode_1 = callingCode; _i < callingCode_1.length; _i++) {
            var item = callingCode_1[_i];
            trimCallingCode = trimCallingCode + item;
            var country = countryDetails.find(function (item) { return (item === null || item === void 0 ? void 0 : item.countryCallingCode) === trimCallingCode; });
            if (country) {
                setFlag(flagUrl(country === null || country === void 0 ? void 0 : country.countryCode));
            }
        }
    };
    return (React.createElement("div", { className: style["phone-number-field__main-container"] + className },
        React.createElement("div", { className: "".concat(style['phone-number-field'], " ").concat(isActive ? style["phone-number-field__active"] : "") },
            React.createElement("img", { alt: "NF", src: flag, className: style["phone-number-field__menu__item__img"] }),
            React.createElement("button", { className: style["phone-number-field__button"], type: "button", id: "Flags", onClick: function () {
                    setDisplayList(!displayList);
                } },
                React.createElement(IconArrowDown, null)),
            React.createElement("span", { className: "".concat(phoneNumber ? style["font-color-black"] : style["grey-color-text"]) }, startingSymbol),
            React.createElement("input", { onFocus: function () { return setIsActive(true); }, onBlur: function () { return setIsActive(false); }, maxLength: 15, placeholder: "123 456 7891", className: style["phone-number-field__input"], value: phoneNumber
                    ? formatIncompletePhoneNumber(startingSymbol + String(phoneNumber)).replace(startingSymbol, "")
                    : "", onChange: function (e) {
                    phoneNumber.length < 4 && setIsFlagSelected(false);
                    handleInputOnChange(e);
                }, onPaste: function (event) {
                    handleInputOnPaste(event);
                }, type: "text" })),
        React.createElement("div", { className: "".concat(style['phone-number-field__menu'], " \n        ").concat(displayList ? style["d-block"] : style["d-none"]) }, countryDetails.map(function (item) {
            return (React.createElement("div", { key: (item === null || item === void 0 ? void 0 : item.countryCode) + (item === null || item === void 0 ? void 0 : item.countryName), onClick: function () {
                    setPhoneNumber(parseInt(item === null || item === void 0 ? void 0 : item.countryCallingCode));
                    setIsFlagSelected(true);
                }, className: style["phone-number-field__menu__item"] },
                React.createElement("img", { alt: "flag", src: flagUrl(item === null || item === void 0 ? void 0 : item.countryCode), className: style["phone-number-field__menu__item__img"] }),
                React.createElement("span", { className: style["phone-number-field__menu__item__country-name"] }, item === null || item === void 0 ? void 0 : item.countryName),
                React.createElement("span", { className: style["phone-number-field__menu__item__country-code"] },
                    "(", item === null || item === void 0 ? void 0 :
                    item.countryCallingCode,
                    ")")));
        }))));
};
