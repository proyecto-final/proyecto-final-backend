FROM  nikolaik/python-nodejs

ARG CORRELATION_URI

COPY evtx_dump-v0.7.2-x86_64-unknown-linux-gnu /bin/

WORKDIR /app

COPY ./temp/shared ./shared

WORKDIR /app/shared

RUN npm install

WORKDIR /app/modules

COPY package.json .

RUN npm install

COPY . .

RUN rm .env

RUN mv .env.docker .env

ENV HOST_CORRELATION=$CORRELATION_URI
ENV PLATFORM=linux

EXPOSE 3036

CMD ["node", "index.js"]