# Build stage
FROM node:10-alpine AS build-env
ARG ci_config_ftp_server=""
ARG ci_config_ftp_user=""
ARG ci_config_ftp_password=""
ARG build_timestamp=""
ARG build_number="0"
ARG build_server="build server undef"
ARG ci_semver="0.0.0"
ARG ci_hash="0000000"
ARG ci_suffix="suffix"
ENV ci_config_ftp_server=${ci_config_ftp_server}
ENV ci_config_ftp_user=${ci_config_ftp_user}
ENV ci_config_ftp_password=${ci_config_ftp_password}
ENV build_timestamp=${build_timestamp}
ENV build_number=${build_number}
ENV build_server=${build_server}    
ENV semver=${ci_semver}
ENV hash=${ci_hash}
ENV suffix=${ci_suffix}

WORKDIR /baan

RUN apk add git

# setup ionic
# RUN npm install -g node-gyp@3.6.2
RUN npm install -g ionic

# copy src
COPY package.json ./package.json

# restore
RUN npm install

COPY . .

# RUN ls -al
RUN git --version
RUN npm run getAppConfig
RUN npm run setBuildInfo "${build_timestamp}" "${build_number}" "${build_server}"
RUN npm run setGoogleMapsApiUrl
RUN npm run setVersionStamp "${semver}" "${suffix}" "${hash}"

# test

# publish
RUN ionic build

# Runtime stage
FROM nginx:alpine
COPY --from=build-env /baan/www /usr/share/nginx/html
