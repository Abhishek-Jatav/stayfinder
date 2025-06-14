import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // local frontend (adjust port if needed)
      'https://stayfinder-house.netlify.app', // deployed frontend
    ],
    credentials: true, // if you're using cookies or auth headers
  });

  await app.listen(3000);
}
bootstrap();
