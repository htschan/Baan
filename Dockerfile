# Build stage
FROM node:6-alpine AS build-env

WORKDIR /baan
# RUN pwd

# setup ionic
RUN npm install -g node-gyp@3.6.2
RUN npm install -g ionic
RUN ionic config set -g yarn true

# copy src
COPY package.json ./package.json
COPY myhomeappconfig.ts .

# restore
RUN yarn install
# RUN ls -alR

COPY . .

# test

# publish
RUN ionic build --prod

# Runtime stage
FROM nginx:alpine
COPY --from=build-env /baan/www /usr/share/nginx/html
