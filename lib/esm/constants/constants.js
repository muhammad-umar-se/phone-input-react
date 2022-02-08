export var phoneNoReg = /^[0-9\b]+$/;
export var flagURL = "https://flagpedia.net/data/flags/h80/";
export var removeSpace = /\s/g;
export var flagUrl = function (countryCode) {
    return flagURL + "".concat(countryCode, ".webp");
};
