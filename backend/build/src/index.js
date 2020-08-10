"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(app_1.default);
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log(process.env.NODE_ENV);
    console.log("Server running on port " + PORT);
});
