FROM node:alpine
ARG MYSQL_CONNECTION_STRING
ARG ENVIRONMENT

WORKDIR /app

COPY ./temp/shared ./shared

WORKDIR /app/shared

RUN npm install

WORKDIR /app/module

COPY package.json .

RUN npm install

COPY . .

RUN rm .env

RUN rm ./config/config.json

RUN mv .env.docker .env

RUN mv ./config/config.docker.json ./config/config.json

ENV MYSQL_CONNECTION_STRING=$MYSQL_CONNECTION_STRING
ENV ENVIRONMENT=$ENVIRONMENT

EXPOSE 3030

CMD ["node", "index.js"]