param([String[]] $modules = "all")
docker-compose stop
docker-compose rm -f
Write-Host $modules
docker-compose --profile $modules up --build -d