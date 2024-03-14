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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const access_token_entity_1 = require("./entities/access-token.entity");
const axios_1 = require("axios");
require("dotenv/config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, accessTokenRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.accessTokenRepository = accessTokenRepository;
    }
    async validadeUser(email, password) {
        const user = await this.usersService.findOne(email);
        if (!user)
            throw new common_1.UnauthorizedException("Email or password incorrect");
        if (user.hashpassword) {
            const hashValidate = await bcrypt.compare(password, user.hashpassword).catch(e => { throw new common_1.UnauthorizedException("Email or password incorrect"); });
            if (!hashValidate)
                throw new common_1.UnauthorizedException("Email or password incorrect");
        }
        else
            throw new common_1.ForbiddenException("The account is a google accont");
        return user;
    }
    async signup(signupAuthDto) {
        const user = {
            name: signupAuthDto.name,
            email: signupAuthDto.email,
            hashpassword: await bcrypt.hash(signupAuthDto.password, 10)
        };
        const newUser = await this.usersService.create(user);
        newUser.googleAccont = false;
        return await this.login(newUser);
    }
    async googleSignup(googleCredentials) {
        if (!googleCredentials.refresh_token) {
            new common_1.BadRequestException(`
      The response from the Google server does not contain the field refresh_token, so it is necessary to configure the parameter access_type as offline when the user is redirected to the authentication server.
      `);
        }
        const googleUser = this.jwtService.decode(googleCredentials.id_token);
        if (!googleUser.email)
            throw new common_1.BadRequestException("Email field is missing, change the parameters when redirecting the user to the goole authentication server");
        const user = {
            email: googleUser.email,
            name: googleUser.name,
            googleRefreshToken: googleCredentials.refresh_token
        };
        const newUser = await this.usersService.create(user);
        newUser.googleAccont = true;
        newUser.photo = googleUser.picture;
        return await this.login(newUser);
    }
    async login(user) {
        const { hashpassword, googleRefreshToken, ...getUserDto } = user;
        const response = {
            access_token: this.jwtService.sign(getUserDto),
            user: getUserDto
        };
        const accessTokenEntity = this.accessTokenRepository.create({ token: response.access_token, user_id: user.user_id });
        this.accessTokenRepository.insert(accessTokenEntity)
            .catch(() => {
            this.accessTokenRepository.update(user.user_id, { token: response.access_token })
                .catch(e => console.log(e));
        });
        return response;
    }
    async googleLogin(googleCredentials) {
        let googleUser = this.jwtService.decode(googleCredentials.id_token);
        if (!googleUser.email)
            throw new common_1.BadRequestException("Email field is missing, change the parameters when redirecting the user to the goole authentication server");
        const user = await this.usersService.findOne(googleUser.email);
        if (!user)
            throw new common_1.NotFoundException("We didn't recognize that account");
        user.googleAccont = true;
        if (!googleUser.picture) {
            user.googleRefreshToken;
            const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&refresh_token=${user.googleRefreshToken}&grant_type=refresh_token`;
            await axios_1.default.post(url)
                .then(async (resp) => {
                await axios_1.default.get("https://www.googleapis.com/userinfo/v2/me", { headers: { Authorization: `Bearer ${resp.data.access_token}` } })
                    .then(resp => googleUser = resp.data)
                    .catch(() => console.log("erro 2 "));
            })
                .catch(() => console.log("erro 1 ", url, user));
        }
        user.photo = googleUser.picture;
        user.name = googleUser.name;
        return await this.login(user);
    }
    async refresh(oldToken) {
        const token = await this.jwtService.verifyAsync(oldToken)
            .then(async (resp) => {
            const { iat, exp, ...user } = this.jwtService.decode(oldToken);
            return {
                access_token: oldToken,
                user
            };
        })
            .catch(async (e) => {
            return null;
        });
        if (false)
            return token;
        else {
            const accessTokenEntity = await this.accessTokenRepository.findOne({ where: { token: oldToken }, relations: ["user_id"], relationLoadStrategy: "query" });
            if (!accessTokenEntity || !accessTokenEntity.user_id)
                throw new common_1.NotFoundException("No users found with this email");
            const user = accessTokenEntity.user_id;
            if (!user.hashpassword && user.googleRefreshToken) {
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&refresh_token=${user.googleRefreshToken}&grant_type=refresh_token`,
                    headers: {}
                };
                return await axios_1.default.request(config)
                    .then(async (response) => {
                    return await this.googleLogin(response.data);
                })
                    .catch((error) => {
                    console.log(error);
                    throw new common_1.InternalServerErrorException();
                });
            }
            else
                return await this.login(user);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(access_token_entity_1.AccessToken)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map