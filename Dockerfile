# Build stage
FROM node:10-alpine AS build-env

WORKDIR /baan
# RUN pwd

# setup ionic
# RUN npm install -g node-gyp@3.6.2
RUN npm install -g ionic

# copy src
COPY package.json ./package.json

# restore
RUN npm install

COPY . .

RUN ls -al

RUN node getappconfig.js

# test

# publish
RUN ionic build

# Runtime stage
FROM nginx:alpine
COPY --from=build-env /baan/www /usr/share/nginx/html
