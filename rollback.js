const { Sequelize } = require("sequelize")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize('finance', 'postgres', 'postgres', {
  host: '192.168.1.177',
  dialect: 'postgres'
});

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

async function down() {await umzug.down()}

down()

console.log('Migration rolled back!');