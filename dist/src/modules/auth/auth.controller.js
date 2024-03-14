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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const signup_auth_dto_1 = require("./dto/signup-auth.dto");
const responses_1 = require("../../serverResponses/responses");
const passport_1 = require("@nestjs/passport");
const get_access_token_auth_dto_1 = require("./dto/get-access_token-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async create(singupAuthDto) {
        const validation = await signup_auth_dto_1.SignupAuthDto.validate(singupAuthDto);
        if (validation.statusCode === 400)
            throw new common_1.BadRequestException(validation.message);
        if (validation.statusCode === 500)
            throw new common_1.InternalServerErrorException(validation.message);
        return await this.authService.signup(singupAuthDto);
    }
    async signupGoogle(req) {
        const credentials = req.user;
        return await this.authService.googleSignup(credentials);
    }
    async loginGoogle(req) {
        const credentials = req.user;
        return await this.authService.googleLogin(credentials);
    }
    async login(req) {
        const user = req.user;
        return await this.authService.login(user);
    }
    async refresh(req) {
        const oldToken = req.headers.authorization.replace("Bearer ", "");
        return await this.authService.refresh(oldToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiExtraModels)(get_access_token_auth_dto_1.GetAccessTokenDto),
    (0, swagger_1.ApiResponse)(responses_1.UserCreated),
    (0, swagger_1.ApiResponse)(responses_1.BadRequest),
    (0, swagger_1.ApiResponse)(responses_1.InternalServerError),
    (0, swagger_1.ApiResponse)(responses_1.Conflict),
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_auth_dto_1.SignupAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiExtraModels)(get_access_token_auth_dto_1.GetAccessTokenDto),
    (0, swagger_1.ApiResponse)(responses_1.UserCreated),
    (0, swagger_1.ApiResponse)(responses_1.BadRequest),
    (0, swagger_1.ApiResponse)(responses_1.InternalServerError),
    (0, swagger_1.ApiResponse)(responses_1.Conflict),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("googlecode")),
    (0, swagger_1.ApiSecurity)("googleLogin"),
    (0, common_1.Post)("signup/oauth"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupGoogle", null);
__decorate([
    (0, swagger_1.ApiExtraModels)(get_access_token_auth_dto_1.GetAccessTokenDto),
    (0, swagger_1.ApiResponse)(responses_1.LoginOk),
    (0, swagger_1.ApiResponse)(responses_1.BadRequest),
    (0, swagger_1.ApiResponse)(responses_1.Unauthorized),
    (0, swagger_1.ApiResponse)(responses_1.InternalServerError),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("googlecode")),
    (0, swagger_1.ApiSecurity)("googleLogin"),
    (0, common_1.Post)("login/oauth"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('basic')),
    (0, swagger_1.ApiExtraModels)(get_access_token_auth_dto_1.GetAccessTokenDto),
    (0, swagger_1.ApiResponse)(responses_1.LoginOk),
    (0, swagger_1.ApiResponse)(responses_1.Unauthorized),
    (0, swagger_1.ApiResponse)(responses_1.Forbidden),
    (0, swagger_1.ApiResponse)(responses_1.BadRequest),
    (0, swagger_1.ApiResponse)(responses_1.InternalServerError),
    (0, swagger_1.ApiSecurity)("basic"),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiSecurity)('JWT'),
    (0, swagger_1.ApiResponse)(responses_1.LoginOk),
    (0, swagger_1.ApiResponse)(responses_1.Unauthorized),
    (0, swagger_1.ApiResponse)(responses_1.Forbidden),
    (0, swagger_1.ApiResponse)(responses_1.BadRequest),
    (0, swagger_1.ApiResponse)(responses_1.InternalServerError),
    (0, common_1.Post)("/refresh"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map