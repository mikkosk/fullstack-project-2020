"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.decodedToken = function (token) {
    var secret = process.env.SECRET;
    if (!secret || !token || token.substr(0, 7) !== 'bearer ') {
        throw new Error("Virheelliset käyttäjätiedot");
    }
    var decodedToken = jsonwebtoken_1.default.verify(token.substr(7), secret);
    return decodedToken;
};
exports.allowedUserType = function (expected, received) {
    if (expected === received.type) {
        return true;
    }
    return false;
};
exports.allowedMuseum = function (museumId, user) {
    if (user.type !== "Admin") {
        return false;
    }
    if (!user.museums.find(function (m) { return m._id.toString() === museumId; })) {
        return false;
    }
    return true;
};
exports.allowedTour = function (museum, tourId) {
    if (!museum.offeredTours.find(function (t) { return t._id.toString() === tourId; })) {
        return false;
    }
    return true;
};
