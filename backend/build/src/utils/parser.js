"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var isNumber = function (number) {
    return typeof number === 'number' || number instanceof Number;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var isTime = function (time) {
    if (time === "closed") {
        return true;
    }
    if (time.length !== 5) {
        return false;
    }
    if (time.substr(2, 1) !== ":") {
        return false;
    }
    var hours = time.substr(0, 2);
    var minutes = time.substr(3, 2);
    if (hours.substr(0, 1) === "0") {
        hours = hours.substr(1, 1);
    }
    if (minutes.substr(0, 1) === "0") {
        minutes = minutes.substr(1, 1);
    }
    return Boolean(Number(minutes) > -1 && Number(minutes) < 60 && Number(hours) > -1 && Number(hours) < 24);
};
var isType = function (type) {
    return type === "Customer" || type === "Admin" || type === "Guide";
};
var isPaymentMethod = function (method) {
    return method === "Cash" || method == "Card" || method === "Bill" || method === "Other";
};
var parseGenericTextField = function (text) {
    if (!text || !isString(text)) {
        throw new Error();
    }
    return text;
};
var parseGenericNumberField = function (number) {
    if (!number || !isNumber(number)) {
        throw new Error();
    }
    return number;
};
var parseLanguage = function (language) {
    try {
        var parsedLanguage = parseGenericTextField(language);
        return parsedLanguage;
    }
    catch (_a) {
        throw new Error('Missing or invalid language');
    }
};
var parseLength = function (length) {
    try {
        var parsedLength = parseGenericNumberField(length);
        return parsedLength;
    }
    catch (_a) {
        throw new Error('Missing or invalid length');
    }
};
var parseName = function (name) {
    try {
        var parsedName = parseGenericTextField(name);
        return parsedName;
    }
    catch (_a) {
        throw new Error('Missing or invalid name' + name);
    }
};
var parseNumberOfPeople = function (number) {
    try {
        var parsedNumber = parseGenericNumberField(number);
        return parsedNumber;
    }
    catch (_a) {
        throw new Error('Missing or invalid number of people');
    }
};
var parsePrice = function (price) {
    try {
        var parsedPrice = parseGenericNumberField(price);
        return parsedPrice;
    }
    catch (_a) {
        throw new Error('Missing or invalid price');
    }
};
var parseInfo = function (info) {
    try {
        console.log(info);
        var parsedInfo = parseGenericTextField(info);
        return parsedInfo;
    }
    catch (_a) {
        throw new Error('Missing or invalid info');
    }
};
var parseLanguages = function (languages) {
    if (!languages || !Array.isArray(languages)) {
        throw new Error('Incorrect or missing list of languages');
    }
    languages.forEach(function (l) { return parseLanguage(l); });
    return languages;
};
var parseTime = function (time) {
    if (!time || !isString(time) || !isTime(time)) {
        throw new Error('Incorrect or missing time');
    }
    return time;
};
var parseDate = function (date) {
    if (!date || !isDate(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};
var parseType = function (type) {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing user type');
    }
    return type;
};
var parsePassword = function (hash) {
    try {
        var parsedPassword = parseGenericTextField(hash);
        return parsedPassword;
    }
    catch (_a) {
        throw new Error('Faulty password');
    }
};
var parsePaymentMethod = function (method) {
    if (!method || !isPaymentMethod(method)) {
        throw new Error('Incorrect or missing payment method');
    }
    return method;
};
exports.toNewTour = function (object) {
    var newTour = {
        possibleLanguages: parseLanguages(object.possibleLanguages),
        lengthInMinutes: parseLength(object.lengthInMinutes),
        tourName: parseName(object.tourName),
        maxNumberOfPeople: parseNumberOfPeople(object.maxNumberOfPeople),
        price: parsePrice(object.price),
    };
    if (object.tourInfo) {
        return __assign(__assign({}, newTour), { tourInfo: parseInfo(object.tourInfo) });
    }
    else {
        return newTour;
    }
};
exports.toNewMuseum = function (object) {
    var newMuseum = {
        museumName: parseName(object.museumName),
        open: {
            mon: parseTime(object.open.mon),
            tue: parseTime(object.open.tue),
            wed: parseTime(object.open.wed),
            thu: parseTime(object.open.thu),
            fri: parseTime(object.open.fri),
            sat: parseTime(object.open.sat),
            sun: parseTime(object.open.sun)
        },
        closed: {
            mon: parseTime(object.closed.mon),
            tue: parseTime(object.closed.tue),
            wed: parseTime(object.closed.wed),
            thu: parseTime(object.closed.thu),
            fri: parseTime(object.closed.fri),
            sat: parseTime(object.closed.sat),
            sun: parseTime(object.closed.sun)
        }
    };
    if (object.openInfo) {
        newMuseum = __assign(__assign({}, newMuseum), { openInfo: parseInfo(object.openInfo) });
    }
    if (object.openInfo) {
        newMuseum = __assign(__assign({}, newMuseum), { museumInfo: parseInfo(object.museumInfo) });
    }
    return newMuseum;
};
exports.toNewUser = function (object) {
    var newUser = {
        type: parseType(object.type),
        name: parseName(object.name),
        username: parseName(object.username),
        password: parsePassword(object.password),
        languages: []
    };
    if (newUser.type === "Guide" && object.languages) {
        newUser.languages = parseLanguages(object.languages);
    }
    return newUser;
};
exports.toReservedTour = function (object) {
    var tour = {
        possibleLanguages: parseLanguages(object.possibleLanguages),
        lengthInMinutes: parseLength(object.lengthInMinutes),
        tourName: parseName(object.tourName),
        maxNumberOfPeople: parseNumberOfPeople(object.maxNumberOfPeople),
        price: parsePrice(object.price),
        chosenLanguage: parseLanguage(object.chosenLanguage),
        groupName: parseName(object.groupName),
        numberOfPeople: parseNumberOfPeople(object.numberOfPeople),
        groupAge: parseInfo(object.groupAge),
        paymentMethod: parsePaymentMethod(object.paymentMethod),
        time: parseTime(object.time),
        date: parseDate(object.date),
        email: parseInfo(object.email),
        groupInfo: parseInfo(object.groupInfo),
        guide: {
            id: "",
            name: ""
        },
        salary: 0,
        confirmed: false
    };
    if (object.tourInfo) {
        return __assign(__assign({}, tour), { tourInfo: parseInfo(object.tourInfo) });
    }
    return tour;
};
