"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
require("dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.CORS === "true") {
        app.enableCors({
            origin: process.env.FRONT_URL,
            credentials: true
        });
    }
    else {
        app.enableCors();
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Marvete Api')
        .setVersion('1.0')
        .addSecurity('basic', {
        type: "http",
        scheme: 'basic'
    })
        .addSecurity('JWT', {
        type: "http",
        scheme: "Bearer"
    })
        .addSecurity('googleLogin', {
        type: "apiKey",
        name: "code",
        in: "header"
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map