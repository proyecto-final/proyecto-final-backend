param([String[]] $modules = @("busqueda", "ips", "correlacion", "timeline", "usuarios", "fake-gateway"))

docker build -t mongo:dev mongo 
docker build -t mysql:dev mysql 

docker run --name mongo-dev-container -d -p 27017:27017 mongo:dev 
docker run --name mysql-dev-container -d -p 3306:3306 mysql:dev 


$modules  | foreach {
    $command = "/c run-module.bat $_"
    Start-Process 'cmd' -ArgumentList $command
}



echo "Corrio todo! Proba los siguientes modulos: "
echo "gateway -> 3035"
echo "usuarios -> 3030"
echo "ips -> 3031"
echo "correlacion -> 3032"
echo "busqueda -> 3033"
echo "timeline -> 3034"