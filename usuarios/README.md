# Seed database

## Running
* Make sure the `config.json` file has the proper credentials
* Run the development enviroment at least once to make sure the tables are created
* Run `npx sequelize-cli db:seed:all` so the database is populated with data
* If you want to revert the migrations, run `npx sequelize-cli db:migrate:undo:all`

## Creating Seed
* Create a new file in the `seeds` folder or use `npx sequelize-cli seed:generate --name demo-seed-file-name`
* Open the file and add the data you want to seed
* Remember to fill the down method with all the data you want to remove to revert your seed

