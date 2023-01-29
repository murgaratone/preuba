FROM node:16-alpine AS builder

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/car-wash-front . /usr/share/nginx/html/
