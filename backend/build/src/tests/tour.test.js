"use strict";
/* eslint-disable no-undef */
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
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var guidedTour_1 = __importDefault(require("../models/guidedTour"));
var museum_1 = __importDefault(require("../models/museum"));
var user_1 = __importDefault(require("../models/user"));
var guidedTours_1 = __importDefault(require("../../data/guidedTours"));
var museums_1 = __importDefault(require("../../data/museums"));
var users_1 = __importDefault(require("../../data/users"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var api = supertest_1.default(app_1.default);
var tourId;
var museumId;
var user;
var headers;
var newTour = {
    possibleLanguages: ["Venäjä"],
    lengthInMinutes: 45,
    tourName: "Uusi opastus",
    maxNumberOfPeople: 25,
    price: 600,
    tourInfo: "Opastus museoon"
};
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var noteObject, museum, _id, username, token, header;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, guidedTour_1.default.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, museum_1.default.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, user_1.default.deleteMany({})];
            case 3:
                _a.sent();
                noteObject = new guidedTour_1.default(guidedTours_1.default[0]);
                return [4 /*yield*/, noteObject.save()];
            case 4:
                _a.sent();
                noteObject = new guidedTour_1.default(guidedTours_1.default[1]);
                return [4 /*yield*/, noteObject.save()];
            case 5:
                _a.sent();
                tourId = noteObject._id;
                museum = new museum_1.default(__assign(__assign({}, museums_1.default[0]), { offeredTours: [tourId] }));
                return [4 /*yield*/, museum.save()];
            case 6:
                _a.sent();
                museumId = museum._id;
                user = new user_1.default(__assign(__assign({}, users_1.default[0]), { passwordHash: "HashOne", museums: [museumId] }));
                return [4 /*yield*/, user.save()];
            case 7:
                _a.sent();
                _id = user._id, username = user.username;
                token = {
                    id: _id,
                    user: username
                };
                if (!process.env.SECRET) {
                    return [2 /*return*/];
                }
                header = jsonwebtoken_1.default.sign(token, process.env.SECRET);
                headers = {
                    'Authorization': "bearer " + header
                };
                return [2 /*return*/];
        }
    });
}); });
test('tours are returned as json', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .get('/api/tour')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('all tours are returned initially', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.get('/api/tour')];
            case 1:
                res = _a.sent();
                expect(res.body).toHaveLength(guidedTours_1.default.length);
                return [2 /*return*/];
        }
    });
}); });
describe('adding a tour', function () {
    test('increases length by one', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/api/tour/museum/" + museumId).set(headers).send(newTour)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/tour')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(guidedTours_1.default.length + 1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('deleting a tour', function () {
    test('deleting tour removes an object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.delete("/api/tour/" + tourId + "/museum/" + museumId).set(headers)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/tour')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(guidedTours_1.default.length - 1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('deleting removes right object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.delete("/api/tour/" + tourId + "/museum/" + museumId).set(headers)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/tour')];
                case 2:
                    res = _a.sent();
                    expect(!res.body.find(function (t) { return t._id === tourId; })).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updating', function () {
    test('updated tour is saved correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedTour;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/api/tour/" + tourId + "/museum/" + museumId).set(headers).send(newTour).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/tour')];
                case 2:
                    res = _a.sent();
                    updatedTour = (res.body.find(function (t) { return t._id === String(tourId); }));
                    delete updatedTour.__v;
                    delete updatedTour._id;
                    expect(updatedTour).toEqual(__assign({}, newTour));
                    return [2 /*return*/];
            }
        });
    }); });
    test('updating tour does not affect size', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/api/tour/" + tourId + "/museum/" + museumId).set(headers).send(newTour).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/tour')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(guidedTours_1.default.length);
                    return [2 /*return*/];
            }
        });
    }); });
    test('trying to update with faulty data does not work', function () { return __awaiter(void 0, void 0, void 0, function () {
        var faultyTour, res, updatedTour;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    faultyTour = {
                        possibleLanguages: ["Venäjä"],
                        lengthInMinutes: 45,
                        tourName: "Uusi opastus",
                        maxNumberOfPeople: 25,
                        price: "ok",
                        tourInfo: "Opastus museoon"
                    };
                    return [4 /*yield*/, api.put("/api/tour/" + tourId + "/museum/" + museumId).set(headers).send(faultyTour).expect(400)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/tour')];
                case 2:
                    res = _a.sent();
                    updatedTour = (res.body.find(function (t) { return t._id === String(tourId); }));
                    delete updatedTour.__v;
                    delete updatedTour._id;
                    expect(updatedTour).toEqual(__assign({}, guidedTours_1.default[1]));
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () {
    mongoose_1.default.connection.close();
});
