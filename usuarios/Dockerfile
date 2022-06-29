FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN rm .env

RUN rm ./config/config.json

RUN mv .env.docker .env

RUN mv ./config/config.docker.json ./config/config.json

RUN npx sequelize-cli db:seed:undo:all

RUN npx sequelize-cli db:seed:all

EXPOSE 3030

CMD ["node", "index.js"]