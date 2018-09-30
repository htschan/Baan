# Build stage
FROM node:10-alpine AS build-env
ENV ci_config_ftp_server=${ci_config_ftp_server}
ENV ci_config_ftp_user=${ci_config_ftp_user}
ENV ci_config_ftp_passwd=${ci_config_ftp_password}

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
