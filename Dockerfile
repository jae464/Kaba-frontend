FROM node:22 as builder

RUN mkdir /app
WORKDIR /app
COPY . ./

RUN npm install
RUN npm run build-vite

FROM nginx:stable-alpine

# build files
COPY --from=builder /app/dist /usr/share/nginx/html

# copy public asset
COPY public /usr/share/nginx/html/public
# copy src asset
COPY src/assets /usr/share/nginx/html/src/assets

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]