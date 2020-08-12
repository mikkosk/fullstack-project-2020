"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var toursRouter_1 = __importDefault(require("./routes/toursRouter"));
require('dotenv').config();
var mongoose_1 = __importDefault(require("mongoose"));
var museumRouter_1 = __importDefault(require("./routes/museumRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var loginRouter_1 = __importDefault(require("./routes/loginRouter"));
var cypressRouter_1 = __importDefault(require("./routes/cypressRouter"));
var keyRouter_1 = __importDefault(require("./routes/keyRouter"));
var path_1 = __importDefault(require("path"));
mongoose_1.default.set('useCreateIndex', true);
var MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}
if (!MONGODB_URI) {
    MONGODB_URI = "";
}
mongoose_1.default.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log('connected to MongoDB');
})
    .catch(function (error) {
    console.log('error connection to MongoDB:', error.message);
});
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.static('frontend'));
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/tour', toursRouter_1.default);
app.use('/api/museum', museumRouter_1.default);
app.use('/api/user', userRouter_1.default);
app.use('/api/login', loginRouter_1.default);
app.use('/api/key', keyRouter_1.default);
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
if (process.env.NODE_ENV === 'test') {
    app.use('/api/test', cypressRouter_1.default);
}
exports.default = app;
