import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 8080; // Usar el puerto asignado o el 8080 como predeterminado
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
