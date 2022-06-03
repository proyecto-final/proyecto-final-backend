docker build -t mongo:dev mongo 
docker build -t mysql:dev mysql 

docker run --name mongo-dev-container -d -p 27014:27014 mongo:dev 
docker run --name mysql-dev-container -d -p 3306:3306 mysql:dev 


@("busqueda","ips","correlacion","timeline", "usuarios")  | foreach {
     $command =  "/c run-module.bat $_"
     Start-Process 'cmd' -ArgumentList $command
    }



echo "Corrio todo! Proba los siguientes modulos: "
echo "usuarios -> 3030"
echo "ips -> 3031"
echo "correlacion -> 3032"
echo "busqueda -> 3033"
echo "timeline -> 3034"