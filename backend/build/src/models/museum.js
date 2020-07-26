"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
var museumSchema = new mongoose_1.Schema({
    museumName: {
        type: String,
        unique: true
    },
    open: {
        mon: { type: String, minlength: 5, maxlength: 6 },
        tue: { type: String, minlength: 5, maxlength: 6 },
        wed: { type: String, minlength: 5, maxlength: 6 },
        thu: { type: String, minlength: 5, maxlength: 6 },
        fri: { type: String, minlength: 5, maxlength: 6 },
        sat: { type: String, minlength: 5, maxlength: 6 },
        sun: { type: String, minlength: 5, maxlength: 6 }
    },
    closed: {
        mon: { type: String, minlength: 5, maxlength: 6 },
        tue: { type: String, minlength: 5, maxlength: 6 },
        wed: { type: String, minlength: 5, maxlength: 6 },
        thu: { type: String, minlength: 5, maxlength: 6 },
        fri: { type: String, minlength: 5, maxlength: 6 },
        sat: { type: String, minlength: 5, maxlength: 6 },
        sun: { type: String, minlength: 5, maxlength: 6 }
    },
    openInfo: {
        type: String || undefined,
    },
    offeredTours: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'TourMon'
        }
    ],
    museumInfo: {
        type: String || undefined,
    },
    reservedTours: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'ReservedMon'
        }],
    userRequests: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'UserMon'
        }]
});
museumSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('MuseumMon', museumSchema);
