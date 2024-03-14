"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleApiKeyStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_headerapikey_1 = require("passport-headerapikey");
const core_1 = require("@nestjs/core");
const axios_1 = require("axios");
require("dotenv/config");
let GoogleApiKeyStrategy = class GoogleApiKeyStrategy extends (0, passport_1.PassportStrategy)(passport_headerapikey_1.HeaderAPIKeyStrategy, "googlecode") {
    constructor(reflector) {
        super({ header: "code", prefix: "" }, true, async (code, done) => {
            if (!code)
                done(new common_1.BadRequestException("the code was not provided"), null);
            const url = `https://oauth2.googleapis.com/token?code=${code}&redirect_uri=${process.env.FRONT_URL}/src/assets/oauthPage.html&client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&grant_type=authorization_code`;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url
            };
            axios_1.default.request(config)
                .then((response) => done(null, response.data))
                .catch((error) => {
                console.log(error);
                done(new common_1.UnauthorizedException("Failed to communicate with the Google server, check if the code is correct"), null);
            });
        });
        this.reflector = reflector;
    }
};
exports.GoogleApiKeyStrategy = GoogleApiKeyStrategy;
exports.GoogleApiKeyStrategy = GoogleApiKeyStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GoogleApiKeyStrategy);
//# sourceMappingURL=google_apiKey.strategy.js.map