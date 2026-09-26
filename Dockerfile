# Estágio 1: Build da aplicação React com Node 20 LTS
FROM node:20-alpine AS build
WORKDIR /app

# Copia dependências e instala
COPY package*.json ./
RUN npm install

# Copia o código-fonte e gera a pasta dist
COPY . .
RUN npm run build

# Estágio 2: Servidor web leve Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]