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
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("../models/user"));
var reservedTour_1 = __importDefault(require("../models/reservedTour"));
var guidedTour_1 = __importDefault(require("../models/guidedTour"));
var museum_1 = __importDefault(require("../models/museum"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var router = express_1.default.Router();
var guidedTour1Cy = {
    possibleLanguages: ["Suomi", "Englanti"],
    lengthInMinutes: 60,
    tourName: "Lasten kierros",
    maxNumberOfPeople: 25,
    price: 60
};
var guidedTour2Cy = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50
};
var museumNoToursCy = {
    museumName: "Tyhjä museo",
    open: {
        mon: "closed",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "closed",
        tue: "16:00",
        wed: "16:00",
        thu: "16:00",
        fri: "16:00",
        sat: "16:00",
        sun: "16:00"
    },
    openInfo: "Suljettu maanantaisin",
    museumInfo: "Pikkuruinen museo"
};
var museumNoReservedCy = {
    museumName: "Varaamaton museo",
    open: {
        mon: "closed",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "closed",
        tue: "16:00",
        wed: "16:00",
        thu: "16:00",
        fri: "16:00",
        sat: "16:00",
        sun: "16:00"
    },
    openInfo: "Suljettu maanantaisin",
    museumInfo: "Museo kaipaa varauksia"
};
var museumReservedCy = {
    museumName: "Museo",
    open: {
        mon: "closed",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "10:00",
        sun: "10:00"
    },
    closed: {
        mon: "closed",
        tue: "16:00",
        wed: "16:00",
        thu: "16:00",
        fri: "16:00",
        sat: "16:00",
        sun: "16:00"
    },
    openInfo: "Suljettu maanantaisin",
    museumInfo: "Täällä kaikki hyvin"
};
var reservedTour1Cy = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50,
    chosenLanguage: "Suomi",
    groupName: "Vantaan koulu",
    numberOfPeople: 10,
    groupAge: "Koululaisia",
    paymentMethod: "Card",
    time: "10:00",
    date: new Date(),
    email: "email@email.com",
    groupInfo: "Koululaisryhmä",
    guide: {
        name: "",
        id: ""
    },
    confirmed: false,
    museum: {
        name: "",
        id: ""
    }
};
var reservedTour2Cy = {
    possibleLanguages: ["Suomi", "Ruotsi"],
    lengthInMinutes: 45,
    tourName: "Taidekierros",
    maxNumberOfPeople: 20,
    price: 50,
    chosenLanguage: "Ruotsi",
    groupName: "Kauniaisten koulu",
    numberOfPeople: 15,
    groupAge: "Koululaisia",
    paymentMethod: "Cash",
    time: "12:00",
    date: new Date(),
    email: "email@email.com",
    groupInfo: "Koululaisryhmä",
    guide: {
        name: "",
        id: ""
    },
    confirmed: false,
    museum: {
        name: "",
        id: ""
    }
};
var customerEmptyCy = {
    name: "CustomerOne",
    type: "Customer",
    username: "CustomerOne",
    password: "CustomerOne",
    languages: []
};
var customerReservedCy = {
    name: "CustomerTwo",
    type: "Customer",
    username: "CustomerTwo",
    password: "CustomerTwo",
    languages: []
};
var admin1Cy = {
    name: "AdminOne",
    type: "Admin",
    username: "AdminOne",
    password: "AdminOne",
    languages: []
};
var admin2Cy = {
    name: "AdminTwo",
    type: "Admin",
    username: "AdminTwo",
    password: "AdminTwo",
    languages: []
};
var guideEmptyCy = {
    name: "GuideOne",
    type: "Guide",
    username: "GuideOne",
    password: "GuideOne",
    languages: ["Suomi"]
};
var guideReservedCy = {
    name: "GuideTwo",
    type: "Guide",
    username: "GuideTwo",
    password: "GuideTwo",
    languages: ["Suomi"]
};
router.post('/reset', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tour1, tour2, reservedTour1, reservedTour2, guide1, _a, _b, _c, museum1, museum2, museum3, customer1, _d, _e, _f, customer2, _g, _h, _j, admin1, _k, _l, _m, admin2, _o, _p, _q, guide2, _r, _s, _t;
    return __generator(this, function (_u) {
        switch (_u.label) {
            case 0:
                console.log("RESET");
                return [4 /*yield*/, user_1.default.deleteMany({})];
            case 1:
                _u.sent();
                return [4 /*yield*/, reservedTour_1.default.deleteMany({})];
            case 2:
                _u.sent();
                return [4 /*yield*/, guidedTour_1.default.deleteMany({})];
            case 3:
                _u.sent();
                return [4 /*yield*/, museum_1.default.deleteMany({})];
            case 4:
                _u.sent();
                return [4 /*yield*/, new guidedTour_1.default(__assign({}, guidedTour1Cy)).save()];
            case 5:
                tour1 = _u.sent();
                return [4 /*yield*/, new guidedTour_1.default(__assign({}, guidedTour2Cy)).save()];
            case 6:
                tour2 = _u.sent();
                return [4 /*yield*/, new reservedTour_1.default(__assign({}, reservedTour1Cy)).save()];
            case 7:
                reservedTour1 = _u.sent();
                return [4 /*yield*/, new reservedTour_1.default(__assign({}, reservedTour2Cy)).save()];
            case 8:
                reservedTour2 = _u.sent();
                _a = user_1.default.bind;
                _b = [__assign({}, guideEmptyCy)];
                _c = { museums: [], reservedTours: [] };
                return [4 /*yield*/, bcrypt_1.default.hash(guideEmptyCy.password, 10)];
            case 9: return [4 /*yield*/, new (_a.apply(user_1.default, [void 0, __assign.apply(void 0, _b.concat([(_c.passwordHash = _u.sent(), _c)]))]))().save()];
            case 10:
                guide1 = _u.sent();
                return [4 /*yield*/, new museum_1.default(__assign({}, museumNoToursCy)).save()];
            case 11:
                museum1 = _u.sent();
                return [4 /*yield*/, new museum_1.default(__assign(__assign({}, museumNoReservedCy), { offeredTours: [tour1], reservedTours: [], userRequests: [guide1] })).save()];
            case 12:
                museum2 = _u.sent();
                return [4 /*yield*/, new museum_1.default(__assign(__assign({}, museumReservedCy), { offeredTours: [tour2], reservedTours: [reservedTour1, reservedTour2], userRequests: [] })).save()];
            case 13:
                museum3 = _u.sent();
                _d = user_1.default.bind;
                _e = [__assign({}, customerEmptyCy)];
                _f = { museums: [], reservedTours: [] };
                return [4 /*yield*/, bcrypt_1.default.hash(customerEmptyCy.password, 10)];
            case 14: return [4 /*yield*/, new (_d.apply(user_1.default, [void 0, __assign.apply(void 0, _e.concat([(_f.passwordHash = _u.sent(), _f)]))]))().save()];
            case 15:
                customer1 = _u.sent();
                _g = user_1.default.bind;
                _h = [__assign({}, customerReservedCy)];
                _j = { museums: [], reservedTours: [reservedTour1, reservedTour2] };
                return [4 /*yield*/, bcrypt_1.default.hash(customerReservedCy.password, 10)];
            case 16: return [4 /*yield*/, new (_g.apply(user_1.default, [void 0, __assign.apply(void 0, _h.concat([(_j.passwordHash = _u.sent(), _j)]))]))().save()];
            case 17:
                customer2 = _u.sent();
                _k = user_1.default.bind;
                _l = [__assign({}, admin1Cy)];
                _m = { museums: [museum1], reservedTours: [] };
                return [4 /*yield*/, bcrypt_1.default.hash(admin1Cy.password, 10)];
            case 18: return [4 /*yield*/, new (_k.apply(user_1.default, [void 0, __assign.apply(void 0, _l.concat([(_m.passwordHash = _u.sent(), _m)]))]))().save()];
            case 19:
                admin1 = _u.sent();
                _o = user_1.default.bind;
                _p = [__assign({}, admin2Cy)];
                _q = { museums: [museum2, museum3], reservedTours: [] };
                return [4 /*yield*/, bcrypt_1.default.hash(admin2Cy.password, 10)];
            case 20: return [4 /*yield*/, new (_o.apply(user_1.default, [void 0, __assign.apply(void 0, _p.concat([(_q.passwordHash = _u.sent(), _q)]))]))().save()];
            case 21:
                admin2 = _u.sent();
                _r = user_1.default.bind;
                _s = [__assign({}, guideReservedCy)];
                _t = { museums: [museum2, museum3], reservedTours: [reservedTour1, reservedTour2] };
                return [4 /*yield*/, bcrypt_1.default.hash(guideReservedCy.password, 10)];
            case 22: return [4 /*yield*/, new (_r.apply(user_1.default, [void 0, __assign.apply(void 0, _s.concat([(_t.passwordHash = _u.sent(), _t)]))]))().save()];
            case 23:
                guide2 = _u.sent();
                reservedTour_1.default.findByIdAndUpdate(reservedTour1._id, { guide: { name: guide2.name, id: guide2._id }, confirmed: true, museum: { name: museum3.museumName, id: museum3._id } });
                reservedTour_1.default.findByIdAndUpdate(reservedTour2._id, { guide: { name: guide2.name, id: guide2._id }, confirmed: true, museum: { name: museum3.museumName, id: museum3._id } });
                res.status(200).end();
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
