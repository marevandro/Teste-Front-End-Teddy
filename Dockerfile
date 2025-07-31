# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Remove o conteúdo padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build da etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração customizada do nginx, se desejar
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
