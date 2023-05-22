# Reference : https://nodejs.org/en/docs/guides/nodejs-docker-webapp
# Operating System
FROM node:lts-bullseye-slim

# Basic Package Install
RUN apt-get update && apt-get install libvips-dev libtool automake autoconf nasm -y

# Working Directory
WORKDIR /app/

COPY ./app/package.json ./app/yarn.lock ./

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn install

COPY ./app .
RUN yarn test