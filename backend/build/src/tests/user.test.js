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
/* eslint-disable no-undef */
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var user_1 = __importDefault(require("../models/user"));
var museum_1 = __importDefault(require("../models/museum"));
var reservedTour_1 = __importDefault(require("../models/reservedTour"));
//import initialTours from '../../data/guidedTours';
var users_1 = __importDefault(require("../../data/users"));
var museums_1 = __importDefault(require("../../data/museums"));
var reservedTours_1 = __importDefault(require("../../data/reservedTours"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var api = supertest_1.default(app_1.default);
//let tourId: string;
var customerId;
var adminId;
var guideId;
var museumId;
var newUser = {
    name: "Name",
    username: "Username",
    type: "Admin",
    password: "Password"
};
var newTour = reservedTours_1.default[0];
var savedMuseum;
var customerHeaders;
var adminHeaders;
var guideHeaders;
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var customer, cToken, header, admin, aToken, aHeader, guide, gToken, gHeader;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, museum_1.default.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, reservedTour_1.default.deleteMany({})];
            case 3:
                _a.sent();
                savedMuseum = new museum_1.default(__assign({}, museums_1.default[0]));
                return [4 /*yield*/, savedMuseum.save()];
            case 4:
                _a.sent();
                museumId = savedMuseum._id;
                customer = new user_1.default(__assign(__assign({}, users_1.default[1]), { passwordHash: "HashTwo", reservedTours: [] }));
                return [4 /*yield*/, customer.save()];
            case 5:
                _a.sent();
                cToken = {
                    id: customer._id,
                    user: customer.username
                };
                customerId = customer._id;
                if (!process.env.SECRET) {
                    return [2 /*return*/];
                }
                header = jsonwebtoken_1.default.sign(cToken, process.env.SECRET);
                customerHeaders = {
                    'Authorization': "bearer " + header
                };
                admin = new user_1.default(__assign(__assign({}, users_1.default[0]), { passwordHash: "HashOne", museums: [museumId] }));
                return [4 /*yield*/, admin.save()];
            case 6:
                _a.sent();
                aToken = {
                    id: admin._id,
                    user: admin.username
                };
                adminId = admin._id;
                if (!process.env.SECRET) {
                    return [2 /*return*/];
                }
                aHeader = jsonwebtoken_1.default.sign(aToken, process.env.SECRET);
                adminHeaders = {
                    'Authorization': "bearer " + aHeader
                };
                guide = new user_1.default(__assign(__assign({}, users_1.default[2]), { passwordHash: "HashThree", museums: [museumId], reservedTours: [] }));
                return [4 /*yield*/, guide.save()];
            case 7:
                _a.sent();
                gToken = {
                    id: guide._id,
                    user: guide.username
                };
                guideId = guide._id;
                if (!process.env.SECRET) {
                    return [2 /*return*/];
                }
                gHeader = jsonwebtoken_1.default.sign(gToken, process.env.SECRET);
                guideHeaders = {
                    'Authorization': "bearer " + gHeader
                };
                return [2 /*return*/];
        }
    });
}); });
test('users are returned as json', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .get('/api/user')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('all users are returned initially', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.get('/api/user')];
            case 1:
                res = _a.sent();
                expect(res.body).toHaveLength(users_1.default.length);
                return [2 /*return*/];
        }
    });
}); });
describe('adding a user', function () {
    test('increases length by one', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/api/user").set(adminHeaders).send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(users_1.default.length + 1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('deleting a user', function () {
    test('deleting user removes an object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.delete("/api/user/" + adminId).set(adminHeaders)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(users_1.default.length - 1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('deleting removes right object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.delete("/api/user/" + adminId).set(adminHeaders)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    expect(!res.body.find(function (t) { return t._id === adminHeaders; })).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updating', function () {
    test('updated user is saved correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedUser, initial;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/api/user/" + adminId).set(adminHeaders).send(newUser).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    updatedUser = (res.body.find(function (t) { return t._id === String(adminId); }));
                    delete updatedUser.__v;
                    delete updatedUser._id;
                    delete updatedUser.passwordHash;
                    delete updatedUser.museums;
                    delete updatedUser.reservedTours;
                    delete updatedUser.languages;
                    initial = __assign({}, newUser);
                    delete initial.password;
                    expect(updatedUser).toEqual(initial);
                    return [2 /*return*/];
            }
        });
    }); });
    test('updating user does not affect size', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/api/user/" + adminId).set(adminHeaders).send(newUser).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(users_1.default.length);
                    return [2 /*return*/];
            }
        });
    }); });
    test('trying to update with faulty data does not work', function () { return __awaiter(void 0, void 0, void 0, function () {
        var faultyUser, res, updatedUser, initial;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    faultyUser = {
                        name: "NAMEname",
                        username: 700,
                        password: "Pass",
                        type: "Type"
                    };
                    return [4 /*yield*/, api.put("/api/user/" + adminId).set(adminHeaders).send(faultyUser).expect(400)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    updatedUser = (res.body.find(function (t) { return t._id === String(adminId); }));
                    delete updatedUser.__v;
                    delete updatedUser._id;
                    delete updatedUser.passwordHash;
                    delete updatedUser.museums;
                    delete updatedUser.reservedTours;
                    delete updatedUser.languages;
                    initial = __assign({}, users_1.default[0]);
                    delete initial.password;
                    expect(updatedUser).toEqual(initial);
                    return [2 /*return*/];
            }
        });
    }); });
    test('adding user to museum works correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/api/user/" + guideId + "/museum/" + museumId).set(adminHeaders).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    updatedUser = (res.body.find(function (t) { return t._id === String(adminId); }));
                    expect(updatedUser.museums[0]._id === savedMuseum._id);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("reserving tour", function () {
    test("adding works", function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/api/user/" + customerId + "/museum/" + museumId + "/reservedtour").set(customerHeaders).send(newTour).expect(200)];
                case 1:
                    updatedUser = _a.sent();
                    expect(updatedUser.body.reservedTours.length).toBe(1);
                    expect(updatedUser.body.reservedTours[0].tourName).toBe(newTour.tourName);
                    return [2 /*return*/];
            }
        });
    }); });
    test("adding does not work if user is not a customer", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/api/user/" + guideId + "/museum/" + museumId + "/reservedtour").set(guideHeaders).send(newTour).expect(401)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 2:
                    res = _a.sent();
                    updatedUser = res.body.find(function (t) { return t._id === String(guideId); });
                    expect(updatedUser.reservedTours.length).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("confirming tour", function () {
    var id;
    test("guide can corfirm tour", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res1, res, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/api/user/" + customerId + "/museum/" + museumId + "/reservedtour").set(customerHeaders).send(__assign({}, newTour))];
                case 1:
                    res1 = _a.sent();
                    id = res1.body.reservedTours[0]._id;
                    return [4 /*yield*/, api.put("/api/user/" + guideId + "/tour/" + id).set(guideHeaders).expect(200)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 3:
                    res = _a.sent();
                    updatedUser = (res.body.find(function (t) { return t._id === String(guideId); }));
                    expect(updatedUser.reservedTours.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test("only guide can corfirm tour", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res1, res, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/api/user/" + customerId + "/museum/" + museumId + "/reservedtour").set(customerHeaders).send(__assign({}, newTour))];
                case 1:
                    res1 = _a.sent();
                    id = res1.body.reservedTours[0]._id;
                    return [4 /*yield*/, api.put("/api/user/" + adminId + "/tour/" + id).set(adminHeaders).expect(401)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, api.get('/api/user')];
                case 3:
                    res = _a.sent();
                    updatedUser = (res.body.find(function (t) { return t._id === String(guideId); }));
                    expect(updatedUser.reservedTours.length).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () {
    mongoose_1.default.connection.close();
});
