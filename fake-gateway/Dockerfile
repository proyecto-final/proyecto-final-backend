FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN rm .env

RUN mv .env.docker .env

EXPOSE 3035

CMD ["node", "index.js"]