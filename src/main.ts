import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import "dotenv/config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.CORS === "true"){
    app.enableCors({
      origin:process.env.FRONT_URL,
      credentials:true
    })
  }
  else{
    app.enableCors()
  }
  const config = new DocumentBuilder()
  .setTitle('Marvete Api')
  .setVersion('1.0')
  .addSecurity('basic',{
    type:"http",
    scheme:'basic'
  })
  .addSecurity('JWT',{
    type:"http",
    scheme:"Bearer"
  })
  .addSecurity('googleLogin',{
    type:"apiKey",
    name:"code",
    in:"header"
  })

  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
