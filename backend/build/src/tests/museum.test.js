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
//import initialTours from '../../data/guidedTours';
var museums_1 = __importDefault(require("../../data/museums"));
var users_1 = __importDefault(require("../../data/users"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var api = supertest_1.default(app_1.default);
//let tourId: string;
var museumId;
var customerHeaders;
var adminHeaders;
var guideHeaders;
var customerId;
var guideId;
var newMuseum = {
    museumName: "Uusi",
    open: {
        mon: "10:00",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "10:00",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    openInfo: "Auki",
    museumInfo: "Museo"
};
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var museum, admin, aToken, aHeader, customer, cToken, header, guide, gToken, gHeader;
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
                museum = new museum_1.default(__assign(__assign({}, museums_1.default[0]), { offeredTours: [] }));
                return [4 /*yield*/, museum.save()];
            case 4:
                _a.sent();
                museum = new museum_1.default(__assign(__assign({}, museums_1.default[1]), { offeredTours: [] }));
                return [4 /*yield*/, museum.save()];
            case 5:
                _a.sent();
                museumId = museum._id;
                if (!process.env.SECRET) {
                    return [2 /*return*/];
                }
                admin = new user_1.default(__assign(__assign({}, users_1.default[0]), { passwordHash: "HashOne", museums: [museumId] }));
                return [4 /*yield*/, admin.save()];
            case 6:
                _a.sent();
                aToken = {
                    id: admin._id,
                    user: admin.username
                };
                aHeader = jsonwebtoken_1.default.sign(aToken, process.env.SECRET);
                adminHeaders = {
                    'Authorization': "bearer " + aHeader
                };
                customer = new user_1.default(__assign(__assign({}, users_1.default[1]), { passwordHash: "HashTwo", reservedTours: [] }));
                return [4 /*yield*/, customer.save()];
            case 7:
                _a.sent();
                cToken = {
                    id: customer._id,
                    user: customer.username
                };
                header = jsonwebtoken_1.default.sign(cToken, process.env.SECRET);
                customerHeaders = {
                    'Authorization': "bearer " + header
                };
                customerId = customer._id;
                guide = new user_1.default(__assign(__assign({}, users_1.default[2]), { passwordHash: "HashThree", museums: [], reservedTours: [] }));
                return [4 /*yield*/, guide.save()];
            case 8:
                _a.sent();
                gToken = {
                    id: guide._id,
                    user: guide.username
                };
                guideId = guide._id;
                gHeader = jsonwebtoken_1.default.sign(gToken, process.env.SECRET);
                guideHeaders = {
                    'Authorization': "bearer " + gHeader
                };
                return [2 /*return*/];
        }
    });
}); });
test('museums are returned as json', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .get('/museum')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('all museums are returned initially', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.get('/museum')];
            case 1:
                res = _a.sent();
                expect(res.body).toHaveLength(museums_1.default.length);
                return [2 /*return*/];
        }
    });
}); });
describe('adding a museum', function () {
    test('increases length by one', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post("/museum").set(adminHeaders).send(newMuseum)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(museums_1.default.length + 1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('deleting a museum', function () {
    test('deleting museum removes an object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.delete("/museum/" + museumId).set(adminHeaders)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(museums_1.default.length - 1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('deleting removes right object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.delete("/museum/" + museumId).set(adminHeaders)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    expect(!res.body.find(function (t) { return t._id === museumId; })).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updating', function () {
    test('updated museum is saved correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedMuseum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/museum/" + museumId).set(adminHeaders).send(newMuseum).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    updatedMuseum = (res.body.find(function (t) { return t._id === String(museumId); }));
                    delete updatedMuseum.__v;
                    delete updatedMuseum._id;
                    expect(updatedMuseum).toEqual(__assign(__assign({}, newMuseum), { offeredTours: [], reservedTours: [], userRequests: [] }));
                    return [2 /*return*/];
            }
        });
    }); });
    test('updating museum does not affect size', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/museum/" + museumId).set(adminHeaders).send(newMuseum).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    expect(res.body).toHaveLength(museums_1.default.length);
                    return [2 /*return*/];
            }
        });
    }); });
    test('trying to update with faulty data does not work', function () { return __awaiter(void 0, void 0, void 0, function () {
        var faultyMuseum, res, updatedMuseum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    faultyMuseum = {
                        museumName: "Faulty",
                        open: {
                            mon: "10K00",
                            tue: "10:00",
                            wed: "10:00",
                            thu: "10:00",
                            fri: "10:00",
                            sat: "10:00",
                            sun: "10:00"
                        },
                        closed: {
                            mon: "10:00",
                            tue: "10:00",
                            wed: "10:00",
                            thu: "10:00",
                            fri: "10:00",
                            sat: "10:00",
                            sun: "10:00"
                        },
                        openInfo: "Auki",
                        museumInfo: "Museo"
                    };
                    return [4 /*yield*/, api.put("/museum/" + museumId).set(adminHeaders).send(faultyMuseum).expect(400)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    updatedMuseum = (res.body.find(function (t) { return t._id === String(museumId); }));
                    delete updatedMuseum.__v;
                    delete updatedMuseum._id;
                    expect(updatedMuseum).toEqual(__assign(__assign({}, museums_1.default[1]), { offeredTours: [], reservedTours: [], userRequests: [] }));
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("request", function () {
    test('adding request works on right type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedMuseum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/museum/" + museumId + "/request").set(guideHeaders).send({ id: guideId }).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 2:
                    res = _a.sent();
                    updatedMuseum = (res.body.find(function (t) { return t._id === String(museumId); }));
                    expect(updatedMuseum.userRequests.length).toEqual(1);
                    expect(String(updatedMuseum.userRequests[0]._id)).toBe(String(guideId));
                    return [2 /*return*/];
            }
        });
    }); });
    test('adding request will not work on wrong type', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/museum/" + museumId + "/request").set(customerHeaders).send({ id: customerId }).expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('removing request works if museum admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedMuseum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/museum/" + museumId + "/request").set(guideHeaders).send({ id: guideId }).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.put("/museum/" + museumId + "/request/remove").set(adminHeaders).send({ id: guideId }).expect(200)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, api.get('/museum')];
                case 3:
                    res = _a.sent();
                    updatedMuseum = (res.body.find(function (t) { return t._id === String(museumId); }));
                    expect(updatedMuseum.userRequests.length).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('removing request will not work if not museum admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.put("/museum/" + museumId + "/request").set(guideHeaders).send({ id: guideId }).expect(200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.put("/museum/" + museumId + "/request/remove").set(customerHeaders).send({ id: guideId }).expect(401)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
test('updating is not possible with faulty headers', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.put("/museum/" + museumId).set(customerHeaders).send(newMuseum).expect(401)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('posting is not possible', function () { return __awaiter(void 0, void 0, void 0, function () {
    var lol;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.post("/museum").set(customerHeaders).send(newMuseum)];
            case 1:
                lol = _a.sent();
                expect(lol.status).toBe(401);
                return [2 /*return*/];
        }
    });
}); });
test('deleting is not possible', function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.delete("/museum/" + museumId).set(customerHeaders)];
            case 1:
                result = _a.sent();
                expect(result.status).toBe(401);
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () {
    mongoose_1.default.connection.close();
});
