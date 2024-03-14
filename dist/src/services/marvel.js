"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const marvel = axios_1.default.create({
    baseURL: process.env.MARVEL_URL,
});
exports.default = marvel;
//# sourceMappingURL=marvel.js.map