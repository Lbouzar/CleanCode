import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.useGlobalFilters(new HttpExceptionFilter());

    setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
