# 1. Neues NestJS-Projekt erstellen
npm i -g @nestjs/cli
nest new backend --package-manager npm
cd backend

# 2. Prisma + Hilfspakete installieren
npm install prisma @prisma/client
npm install -D ts-node

# 3. Prisma initialisieren
npx prisma init

# 4. Swagger installieren
npm install @nestjs/swagger swagger-ui-express

# 5. Nützliche Dev-Tools für DB und DX
npm install class-validator class-transformer
npm install -D @types/swagger-ui-express

# 6. Prisma config (Beispiel)
echo 'datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}' > prisma/schema.prisma

# 7. Beispiel-Datenbankvariable (Postgres)
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"' > .env

# 8. Swagger in main.ts aktivieren
sed -i '1i import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";' src/main.ts
sed -i '/await app.listen/a\
  const config = new DocumentBuilder()\
    .setTitle("Backend API")\
    .setDescription("API documentation")\
    .setVersion("1.0")\
    .build();\
  const document = SwaggerModule.createDocument(app, config);\
  SwaggerModule.setup("api", app, document);' src/main.ts

# 9. Prisma Client generieren
npx prisma generate

# 10. Starten
npm run start:dev
