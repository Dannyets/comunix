
FROM node:12-alpine as build-deps
 
WORKDIR /usr/src/app

COPY package.json tsconfig.json yarn.lock ./
COPY ./src ./src

RUN yarn install

RUN yarn compile

EXPOSE 8087

CMD ["yarn", "start"]
