docker build -t mongo:dev mongo 
docker build -t mysql:dev mysql 
docker build -t evtx-converter:dev evtx-converter --buiild-arg CORRELATION_URI=localhost:3036

docker run --name mongo-dev-container -d -p 27014:27014 mongo:dev 
docker run --name mysql-dev-container -d -p 3306:3306 mysql:dev 
docker run --name evtx-converter-dev-container -d -p 3036:3036 evtx-converter:dev 


cd busqueda
npm i &
npm run dev &
cd ..

cd ips
npm i &
npm run dev &
cd ..

cd correlacion
npm i &
npm run dev &
cd ..

cd timeline
npm i &
npm run dev &
cd ..

cd usuarios
npm i &
npm run dev &
cd ..

cd fake-gateway
npm i &
npm run dev &
cd ..

echo "Corrio todo! Proba los siguientes modulos: \nbusqueda->3031 \nbusqueda->3031 \nbusqueda->3031 \nbusqueda->3031 \nbusqueda->3031 \n"