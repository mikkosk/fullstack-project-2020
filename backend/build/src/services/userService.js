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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var museum_1 = __importDefault(require("../models/museum"));
var reservedTour_1 = __importDefault(require("../models/reservedTour"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.find({}).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
var getUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(id).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('Kyseistä käyttäjää ei löytynyt');
                }
                return [2 /*return*/, user];
        }
    });
}); };
var addUser = function (entry) { return __awaiter(void 0, void 0, void 0, function () {
    var type, name, username, password, languages, saltRounds, passwordHash, newUser, savedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = entry.type, name = entry.name, username = entry.username, password = entry.password, languages = entry.languages;
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
            case 1:
                passwordHash = _a.sent();
                newUser = new user_1.default({
                    type: type,
                    name: name,
                    username: username,
                    passwordHash: passwordHash,
                    museums: [],
                    reservedTours: [],
                    languages: languages
                });
                return [4 /*yield*/, newUser.save()];
            case 2:
                savedUser = _a.sent();
                return [2 /*return*/, savedUser];
        }
    });
}); };
var updateUser = function (entry, id) { return __awaiter(void 0, void 0, void 0, function () {
    var name, username, password, type, languages, saltRounds, passwordHash, newUser, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = entry.name, username = entry.username, password = entry.password, type = entry.type, languages = entry.languages;
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
            case 1:
                passwordHash = _a.sent();
                newUser = {
                    name: name,
                    type: type,
                    username: username,
                    passwordHash: passwordHash,
                    languages: languages
                };
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(id, newUser, { new: true }).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 2:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    throw new Error('Kyseistä käyttäjää ei löytynyt');
                }
                return [2 /*return*/, updatedUser];
        }
    });
}); };
var addUserToMuseum = function (museum, id) { return __awaiter(void 0, void 0, void 0, function () {
    var existingMuseum, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, museum_1.default.findById(museum).populate('reservedTours')];
            case 1:
                existingMuseum = _a.sent();
                if (!existingMuseum) {
                    throw new Error("Kyseistä museota ei löytynyt");
                }
                return [4 /*yield*/, user_1.default.findById(id).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw new Error('Kyseistä käyttäjää ei löytynyt');
                }
                if (user.type === "Customer") {
                    throw new Error('Käyttäjää ei voi liittää museoon');
                }
                user.museums = user.museums.concat(existingMuseum);
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var deleteUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findByIdAndDelete(id)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addReservedTour = function (museumId, id, tour) { return __awaiter(void 0, void 0, void 0, function () {
    var museum, newTour, user, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, museum_1.default.findById(museumId)];
            case 1:
                museum = _a.sent();
                if (!museum) {
                    throw new Error("Museota, johon varaus yritettiin tehdä ei löytynyt");
                }
                newTour = new reservedTour_1.default(__assign(__assign({}, tour), { museum: {
                        name: museum.museumName,
                        id: museum._id
                    } }));
                return [4 /*yield*/, newTour.save()];
            case 2:
                _a.sent();
                museum.reservedTours = museum.reservedTours.concat(newTour._id);
                return [4 /*yield*/, user_1.default.findById(id).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 3:
                user = _a.sent();
                if (!user || user.type !== "Customer") {
                    throw new Error("Käyttäjää ei löytynyt tai kyseessä ei ole asiakaskäyttäjä");
                }
                user.reservedTours = user.reservedTours.concat(newTour);
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(id, user, { new: true }).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 4:
                updatedUser = _a.sent();
                museum.save();
                if (!updatedUser) {
                    throw new Error("Käyttäjää ei löytynyt");
                }
                return [2 /*return*/, updatedUser];
        }
    });
}); };
var confirmTour = function (tourId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tour, updatedTour, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(userId).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, reservedTour_1.default.findById(tourId)];
            case 2:
                tour = _a.sent();
                if (!user || user.type !== "Guide") {
                    throw new Error('Käyttäjää ei ole olemassa tai se ei ole oikeanlainen');
                }
                if (tour && tour.confirmed === true) {
                    throw new Error('Kierros on jo varattu');
                }
                return [4 /*yield*/, reservedTour_1.default.findByIdAndUpdate(tourId, { guide: { name: user.name, id: user._id }, confirmed: true }, { new: true })];
            case 3:
                updatedTour = _a.sent();
                if (!updatedTour) {
                    throw new Error('Kyseistä museota ei löytynyt');
                }
                return [4 /*yield*/, user_1.default.findById(userId).populate({ path: 'museums', populate: { path: 'reservedTours' } }).populate("reservedTours")];
            case 4:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    throw new Error('Käyttäjää ei löytynyt');
                }
                updatedUser.reservedTours = updatedUser.reservedTours.concat(updatedTour);
                return [4 /*yield*/, updatedUser.save()];
            case 5:
                _a.sent();
                return [2 /*return*/, updatedUser];
        }
    });
}); };
exports.default = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    addUserToMuseum: addUserToMuseum,
    deleteUser: deleteUser,
    addReservedTour: addReservedTour,
    confirmTour: confirmTour
};
