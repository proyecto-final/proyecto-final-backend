docker stop mongo-dev-container
docker rm -f mongo-dev-container
docker stop mysql-dev-container
docker rm -f mysql-dev-container
docker stop evtx-converter-dev-container
docker rm -f evtx-converter-dev-container

docker build -t mongo:dev mongo 
docker build -t mysql:dev mysql
cp -r ./shared ./evtx-converter/temp/
docker build --build-arg CORRELATION_URI=http://host.docker.internal:3032/api -t evtx-converter:dev evtx-converter

docker run --name mongo-dev-container -d -p 27017:27017 mongo:dev 
docker run --name mysql-dev-container -d -p 3306:3306 mysql:dev 
docker run --name evtx-converter-dev-container -d -p 3036:3036 evtx-converter:dev 


# cd busqueda
# npm i &
# npm run dev &
# cd ..

# cd ips
# npm i &
# npm run dev &
# cd ..

# cd correlacion
# npm i &
# npm run dev &
# cd ..

# cd timeline
# npm i &
# npm run dev &
# cd ..

# cd usuarios
# npm i &
# npm run dev &
# cd ..

# cd fake-gateway
# npm i &
# npm run dev &
# cd ..

echo "Corrio todo! Proba los siguientes modulos: \mysql->3306 \mongo->27017 \evtx-converter->3036\n"