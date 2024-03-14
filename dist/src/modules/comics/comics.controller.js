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
exports.ComicsController = void 0;
const common_1 = require("@nestjs/common");
const comics_service_1 = require("./comics.service");
const swagger_1 = require("@nestjs/swagger");
const responses_1 = require("../../serverResponses/responses");
const marvel_1 = require("../../services/marvel");
const passport_1 = require("@nestjs/passport");
let ComicsController = class ComicsController {
    constructor(comicsService) {
        this.comicsService = comicsService;
    }
    async findAll() {
        const url = `${process.env.MARVEL_URL}/comics?ts=${process.env.MARVEL_TS}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_HASH}&dateDescriptor=thisMonth`;
        const comics = await marvel_1.default.get(url)
            .then(response => response.data.data.results)
            .catch(() => { throw new common_1.ServiceUnavailableException(); });
        return comics;
    }
};
exports.ComicsController = ComicsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiSecurity)('JWT'),
    (0, swagger_1.ApiResponse)(responses_1.BadRequest),
    (0, swagger_1.ApiResponse)(responses_1.ServiceUnavailable),
    (0, swagger_1.ApiResponse)(responses_1.InternalServerError),
    (0, swagger_1.ApiResponse)(responses_1.Unauthorized),
    (0, swagger_1.ApiResponse)(responses_1.Ok),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComicsController.prototype, "findAll", null);
exports.ComicsController = ComicsController = __decorate([
    (0, swagger_1.ApiTags)("comics"),
    (0, common_1.Controller)('comics'),
    __metadata("design:paramtypes", [comics_service_1.ComicsService])
], ComicsController);
//# sourceMappingURL=comics.controller.js.map