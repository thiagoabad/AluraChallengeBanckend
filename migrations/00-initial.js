const { Sequelize } = require("sequelize")

async function up({ context: queryInterface }) {
	await queryInterface.createTable('receitas', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		descricao: {
			type: Sequelize.STRING,
			allowNull: false
		},
        valor: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
        data: {
			type: Sequelize.DATE,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});
	await queryInterface.createTable('despesas', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		descricao: {
			type: Sequelize.STRING,
			allowNull: false
		},
        valor: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
        data: {
			type: Sequelize.DATE,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});
}

async function down({ context: queryInterface }) {
	await queryInterface.dropTable('receitas');
    await queryInterface.dropTable('despesas');
}

module.exports = { up, down };