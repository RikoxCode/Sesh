# ==========================================
# SIMPLE DOCKERFILE FÜR NESTJS
# ==========================================

FROM node:20-alpine

WORKDIR /app

# OpenSSL für Prisma
RUN apk add --no-cache openssl

# Dependencies installieren
COPY package*.json ./
RUN npm install

# Prisma setup
COPY prisma ./prisma/
RUN npx prisma generate

# App Code kopieren
COPY . .

# App bauen
RUN npm run build

# Port
EXPOSE 3000

# Start
CMD ["npm", "run", "start:prod"]