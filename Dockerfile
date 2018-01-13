# Build stage
FROM node:6-alpine

WORKDIR /baan
# RUN pwd

# setup ionic
RUN npm install -g node-gyp@3.6.2
RUN npm install -g ionic
RUN ionic help
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
RUN ionic build

# Runtime stage
CMD []
#ENTRYPOINT ["/nodejs/bin/npm", "start"]
