FROM node:22 as builder

RUN mkdir /app
WORKDIR /app
COPY . ./

RUN npm install
RUN npm run build-vite

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf