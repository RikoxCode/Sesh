import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  const config = new DocumentBuilder()
    .setTitle("Backend API")
    .setDescription("API documentation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
bootstrap();
