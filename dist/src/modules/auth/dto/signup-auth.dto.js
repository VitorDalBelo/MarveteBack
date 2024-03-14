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
exports.SignupAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Yup = require("yup");
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["BADREQUEST"] = 400] = "BADREQUEST";
    StatusCode[StatusCode["INTERNALERROR"] = 500] = "INTERNALERROR";
})(StatusCode || (StatusCode = {}));
class SignupAuthDto {
    static async validate(value, options) {
        return SignupAuthDto.schema.validate(value, options)
            .then(() => ({ statusCode: 200, message: "" }))
            .catch(err => {
            if (err instanceof Yup.ValidationError) {
                return {
                    statusCode: 400,
                    message: err.errors[0],
                };
            }
            else {
                return {
                    statusCode: 500,
                    message: 'An unexpected error occurred.',
                };
            }
        });
    }
}
exports.SignupAuthDto = SignupAuthDto;
SignupAuthDto.schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be valid').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SignupAuthDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SignupAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SignupAuthDto.prototype, "password", void 0);
//# sourceMappingURL=signup-auth.dto.js.map