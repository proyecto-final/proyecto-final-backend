FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN rm .env

RUN rm ./config/config.json

RUN mv .env.docker .env

RUN mv ./config/config.docker.json ./config/config.json

EXPOSE 3030

CMD ["node", "index.js"]