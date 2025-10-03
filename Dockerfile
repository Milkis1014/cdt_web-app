# Dockerfile

# Stage 1: Build the app
FROM node:18 AS builder
WORKDIR /app
COPY ./web-app/client ./
RUN npm install
RUN npm run build   # generates dist/

# Stage 2: Serve with Nginx
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/conf/nginx_docker.conf /etc/nginx/nginx.conf
COPY ./nginx/conf/mime.types /etc/nginx/mime.types
