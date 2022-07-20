FROM node:alpine

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

EXPOSE 3030

CMD ["node", "index.js"]