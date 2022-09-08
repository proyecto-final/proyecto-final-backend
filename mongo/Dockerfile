#Base image
FROM mongo:4.2.22

EXPOSE 27017
ENV MONGO_INITDB_ROOT_PASSWORD=root
ENV MONGO_INITDB_ROOT_USERNAME=sherlock
ENV MONGO_INITDB_DATABASE=test

COPY default_data/ /docker-entrypoint-initdb.d/



