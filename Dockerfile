FROM node:22 as builder

RUN mkdir /app
WORKDIR /app
COPY . ./

RUN npm install
RUN vite build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]