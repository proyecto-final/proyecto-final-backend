﻿# Proyecto final backend

## Run from docker
* `docker-compose up -d`
* Check docker desktop in order to see the compose group running.
* You should have the following containers running:
    * `proyecto-final-backend_mysql_1`, port: `3306`
    * `proyecto-final-backend_mongo_1`, port: `27017`
    * `proyecto-final-backend_timeline_1`, port: `3034`
    * `proyecto-final-backend_ips_1`, port: `3031`
    * `proyecto-final-backend_busqueda_1`, port: `3033`
    * `proyecto-final-backend_correlacion_1`, port: `3032`
    * `proyecto-final-backend_usuario_1`, port: `3030`
## Connect to local DBs
* MySQL: 
    * Default port: `3306`
    * host: `localhost`
    * user: `root`
    * password: `root`
* MongoDB:
    * Default port: `27017`
    * host: `localhost`
    * user: `sherlock`
    * password: `root`

## Run from local
* Before you start make sure docker is running
* `./dev-script-down.ps1` - This one should clean every resource that you need to run the application.
* `./dev-script-up.ps1` - It gives you a cmd console to see execution for each module that is running.  
* You should have the following containers running:
    * `mysql-dev-container`, port: `3306`
    * `mongo-dev-container`, port: `27017`
* You should have the following modules running on `localhost`:
    * `timeline`, port: `3034`
    * `ips`, port: `3031`
    * `busqueda`, port: `3033`
    * `correlacion`, port: `3032`
    * `usuario`, port: `3030`
* Note: if you use `./dev-script-down.ps1` to kill the modules nodemon will try to put them online again. I suggest you to close every console and then use the script to free resources.

## Connect to local DBs
* MySQL: 
    * Default port: `3306`
    * host: `localhost`
    * user: `root`
    * password: `root`
* MongoDB:
    * Default port: `27017`
    * host: `localhost`
    * user: `sherlock`
    * password: `root`


## Swagger
* timeline: `<machineip>:3034/api-docs`
* ips: `<machineip>:3031/api-docs`
* busqueda: `<machineip>:3033/api-docs`
* correlacion: `<machineip>:3032/api-docs`
* usuario: `<machineip>:3030/api-docs`
