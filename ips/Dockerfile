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

RUN mv .env.docker .env

EXPOSE 3031

CMD ["node", "index.js"]