import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // Local frontend
      'https://stayfinder-house.netlify.app', // Deployed Netlify frontend (no trailing slash)
    ],
    credentials: true, // Needed if frontend sends cookies or uses Authorization headers
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
