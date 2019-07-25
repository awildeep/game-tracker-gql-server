FROM node:current-slim as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 4224
CMD [ "node", "/usr/src/app/lib/index.js" ]