"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flagUrl = exports.removeSpace = exports.flagURL = exports.phoneNoReg = void 0;
exports.phoneNoReg = /^[0-9\b]+$/;
exports.flagURL = "https://flagpedia.net/data/flags/h80/";
exports.removeSpace = /\s/g;
var flagUrl = function (countryCode) {
    return exports.flagURL + "".concat(countryCode, ".webp");
};
exports.flagUrl = flagUrl;
