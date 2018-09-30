# Build stage
FROM node:10-alpine AS build-env
ARG build_server="Teamcity"
ENV ci_config_ftp_server=${ci_config_ftp_server}
ENV ci_config_ftp_user=${ci_config_ftp_user}
ENV ci_config_ftp_password=${ci_config_ftp_password}
ENV build_timestamp=${build_timestamp}
ENV build_number=${build_number}
ENV build_server=${build_server}    

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

# RUN ls -al

RUN npm run getAppConfig
RUN npm run setBuildInfo "${build_timestamp}" "${build_number}" "${build_server}"
RUN npm run setGoogleMapsApiUrl
RUN npm run prebuild

# test

# publish
RUN ionic build

# Runtime stage
FROM nginx:alpine
COPY --from=build-env /baan/www /usr/share/nginx/html
