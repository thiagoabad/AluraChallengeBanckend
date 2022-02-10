const { Sequelize } = require("sequelize")

async function up({ context: queryInterface }) {
	await queryInterface.createTable('categorias_de_despesas', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		nome: {
			type: Sequelize.STRING,
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
    let now = new Date()
    now = now.toISOString()
    console.log(now)
    await queryInterface.bulkInsert('categorias_de_despesas', [
        { id: "1", nome: "Alimentação", createdAt: now, updatedAt: now },
        { id: "2", nome: "Saúde", createdAt: now, updatedAt: now },
        { id: "3", nome: "Moradia", createdAt: now, updatedAt: now },
        { id: "4", nome: "Transporte", createdAt: now, updatedAt: now },
        { id: "5", nome: "Educação", createdAt: now, updatedAt: now },
        { id: "6", nome: "Lazer", createdAt: now, updatedAt: now },
        { id: "7", nome: "Imprevistos", createdAt: now, updatedAt: now },
        { id: "8", nome: "Outras", createdAt: now, updatedAt: now },
    ])
}

async function down({ context: queryInterface }) {
	await queryInterface.dropTable('categorias_de_despesas');
}

module.exports = { up, down };