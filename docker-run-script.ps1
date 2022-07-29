param([String[]] $modules = "all")
docker-compose stop
docker-compose rm -f
rm -r ./usuarios/temp
rm -r ./timeline/temp
rm -r ./correlacion/temp
rm -r ./busqueda/temp
rm -r ./ips/temp
rm -r ./evtx-converter/temp

mkdir ./usuarios/temp
mkdir ./timeline/temp
mkdir ./correlacion/temp
mkdir ./busqueda/temp
mkdir ./ips/temp
mkdir ./evtx-converter/temp

cp -r ./shared ./usuarios/temp/shared
cp -r ./shared ./timeline/temp/shared
cp -r ./shared ./correlacion/temp/shared
cp -r ./shared ./busqueda/temp/shared
cp -r ./shared ./ips/temp/shared
cp -r ./shared ./evtx-converter/temp/shared
docker-compose --profile $modules up --build -d