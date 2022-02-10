const { Sequelize } = require("sequelize")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize('finance', 'postgres', 'postgres', {
  host: '192.168.1.178',
  dialect: 'postgres'
});

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

async function runMigration() {
    await umzug.up()
    console.log('Migration up!')
}

module.exports = { sequelize, runMigration };