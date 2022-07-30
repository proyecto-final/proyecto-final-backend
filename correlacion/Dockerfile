FROM node:alpine

ARG MONGODB_URI
COPY chainsaw_exec/chainsaw_x86_64-unknown-linux-mus /bin/chainsaw
COPY chainsaw_exec/LICENCE /bin/
RUN mkdir /bin/mappings
COPY chainsaw_exec/mappings/sigma-event-logs-legacy.yml /bin/mappings
COPY chainsaw_exec/mappings/sigma-event-logs-all.yml /bin/mappings

WORKDIR /app

COPY ./temp/shared ./shared

WORKDIR /app/shared

RUN npm install

WORKDIR /app/modules

COPY package.json .

RUN npm install

COPY . .

RUN mv chainsaw_exec/sigma/ ./chainsaw/sigma

RUN rm .env

RUN mv .env.docker .env

ENV MONGODB_URI=$MONGODB_URI

EXPOSE 3032

CMD ["node", "index.js"]