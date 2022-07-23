docker build -t mongo:dev mongo 
docker build -t mysql:dev mysql 

docker run --name mongo-dev-container -d -p 27017:27017 mongo:dev 
docker run --name mysql-dev-container -d -p 3306:3306 mysql:dev 


echo "Corrio todo! Proba los siguientes modulos: "
echo "mongo -> 27017"
echo "mysql -> 3306"