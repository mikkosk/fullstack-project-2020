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
var parseGenericTextField = function (text, error) {
    if (!text || !isString(text)) {
        throw new Error('Missing or invalid ' + error);
    }
    return text;
};
var parseGenericNumberField = function (number, error) {
    if (!number || !isNumber(number)) {
        throw new Error('Missing or invalid ' + error);
    }
    return number;
};
var parseLatLong = function (number) {
    if (!isNaN(number) && number <= 90 && number >= -90) {
        return number;
    }
    else {
        throw new Error("Missing or invalid coordinate");
    }
};
var parseLanguages = function (languages) {
    if (!languages || !Array.isArray(languages)) {
        throw new Error('Incorrect or missing list of languages');
    }
    languages.forEach(function (l) { return parseGenericTextField(l, "language"); });
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
var parsePaymentMethod = function (method) {
    if (!method || !isPaymentMethod(method)) {
        throw new Error('Incorrect or missing payment method');
    }
    return method;
};
exports.toNewTour = function (object) {
    var newTour = {
        possibleLanguages: parseLanguages(object.possibleLanguages),
        lengthInMinutes: parseGenericNumberField(object.lengthInMinutes, "length"),
        tourName: parseGenericTextField(object.tourName, "tour name"),
        maxNumberOfPeople: parseGenericNumberField(object.maxNumberOfPeople, "number of people"),
        price: parseGenericNumberField(object.price, "price"),
    };
    if (object.tourInfo) {
        return __assign(__assign({}, newTour), { tourInfo: parseGenericTextField(object.tourInfo, "tour info") });
    }
    else {
        return newTour;
    }
};
exports.toNewMuseum = function (object) {
    var newMuseum = {
        museumName: parseGenericTextField(object.museumName, "museum name"),
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
        },
        location: parseGenericTextField(object.location, "location"),
        lat: parseLatLong(object.lat),
        long: parseLatLong(object.long)
    };
    if (object.openInfo) {
        newMuseum = __assign(__assign({}, newMuseum), { openInfo: parseGenericTextField(object.openInfo, "open info") });
    }
    if (object.museumInfo) {
        newMuseum = __assign(__assign({}, newMuseum), { museumInfo: parseGenericTextField(object.museumInfo, "museum info") });
    }
    if (object.image) {
        newMuseum = __assign(__assign({}, newMuseum), { image: parseGenericTextField(object.image, "image path") });
    }
    return newMuseum;
};
exports.toNewUser = function (object) {
    var newUser = {
        type: parseType(object.type),
        name: parseGenericTextField(object.name, "name"),
        username: parseGenericTextField(object.username, "username"),
        password: parseGenericTextField(object.password, "password"),
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
        lengthInMinutes: parseGenericNumberField(object.lengthInMinutes, "length"),
        tourName: parseGenericTextField(object.tourName, "tour name"),
        maxNumberOfPeople: parseGenericNumberField(object.maxNumberOfPeople, "max number of people"),
        price: parseGenericNumberField(object.price, "price"),
        chosenLanguage: parseGenericTextField(object.chosenLanguage, "language"),
        groupName: parseGenericTextField(object.groupName, "group name"),
        numberOfPeople: parseGenericNumberField(object.maxNumberOfPeople, "number of people"),
        groupAge: parseGenericTextField(object.groupAge, "group age"),
        paymentMethod: parsePaymentMethod(object.paymentMethod),
        time: parseTime(object.time),
        date: parseDate(object.date),
        email: parseGenericTextField(object.email, "email"),
        groupInfo: parseGenericTextField(object.groupInfo, "group info"),
        guide: {
            id: "",
            name: ""
        },
        salary: 0,
        confirmed: false
    };
    if (object.tourInfo) {
        return __assign(__assign({}, tour), { tourInfo: parseGenericTextField(object.tourInfo, "tour info") });
    }
    return tour;
};
