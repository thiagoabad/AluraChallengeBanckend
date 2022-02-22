const { Sequelize } = require("sequelize")

async function up({ context: queryInterface }) {
    await queryInterface.addColumn('despesas', 'id_categoria', { type: Sequelize.INTEGER });
}

async function down({ context: queryInterface }) {
	await queryInterface.removeColumn('despesas', 'id_categoria');
}

module.exports = { up, down };