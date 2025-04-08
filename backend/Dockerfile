# Étape 1 : Builder
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Étape 2 : Runner optimisé
FROM node:18-alpine

WORKDIR /app

# Copier uniquement le résultat du build précédent
COPY --from=builder /app .

# Ne jamais inclure le .env (doit être fourni par docker run ou docker-compose)
EXPOSE 5000

CMD ["node", "index.js"]
