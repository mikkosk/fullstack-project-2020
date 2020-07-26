"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
var reservedSchema = new mongoose_1.Schema({
    possibleLanguages: [{ type: String }],
    lengthInMinutes: Number,
    tourName: String,
    maxNumberOfPeople: Number,
    price: Number,
    tourInfo: String || undefined,
    chosenLanguage: String,
    groupName: String,
    numberOfPeople: Number,
    groupAge: String,
    paymentMethod: String,
    time: String,
    date: Date,
    email: String,
    groupInfo: String,
    guide: {
        id: String,
        name: String,
    },
    salary: { type: Number, required: false },
    confirmed: Boolean,
    museum: {
        id: String,
        name: String
    }
});
exports.default = mongoose_1.default.model('ReservedMon', reservedSchema);
