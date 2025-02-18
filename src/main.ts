import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**Use validation pipes globally */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that are not in the DTO
      forbidNonWhitelisted: true, // Throws error when unknown properties are present
      transform: true, // Automatically transforms types
    }),
  );

  /**Swegger setup */

  const config = new DocumentBuilder()
    .setTitle('Nestjs Blog Post Api')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-servise')
    .setLicense('MIT License', 'http://localhost:3000')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  //Instabtiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
