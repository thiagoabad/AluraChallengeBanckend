const { Sequelize } = require("sequelize")
const { Umzug, SequelizeStorage } = require("umzug");

//TODO change by env
const sequelize = new Sequelize('finance', 'postgres', 'postgres', {
    host: '192.168.1.182',
    dialect: 'postgres',
    logging: false,
  })

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: false,
})

const runMigration = new Promise(function(resolve, reject) {
  umzug.up()
  .then(() => {
    console.log("Migration done!")
    resolve();
  })
  .catch(error => {
    reject(Error("Error on migration: " + error));
  })
});

module.exports = { sequelize, runMigration };