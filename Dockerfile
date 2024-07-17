FROM node:22 as builder

RUN mkdir /build
WORKDIR /build
COPY . ./

RUN npm install

FROM node:22-alpine

RUN mkdir /run
WORKDIR /run
COPY --from=builder /build /run

ENTRYPOINT ["npm", "run", "dev"]