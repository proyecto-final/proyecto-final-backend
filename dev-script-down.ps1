docker stop mongo-dev-container 
docker stop mysql-dev-container 
docker rm mongo-dev-container 
docker rm mysql-dev-container  

./kill-process.ps1 3030
./kill-process.ps1 3031
./kill-process.ps1 3032
./kill-process.ps1 3033
./kill-process.ps1 3034
./kill-process.ps1 3306
./kill-process.ps1 27017