FROM node:22 as builder

RUN mkdir /build
WORKDIR /build
COPY . ./

RUN npm install

FROM node:22-alpine

RUN mkdir /kaba
WORKDIR /kaba
COPY --from=builder /build /kaba

ENTRYPOINT ["npm", "run", "dev"]