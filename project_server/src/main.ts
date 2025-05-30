import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/GlobalFilter/Error.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET',
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
