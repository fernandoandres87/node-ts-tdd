FROM node:14
WORKDIR /usr/src/clean-node-api
RUN npm install --only=prod