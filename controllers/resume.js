const Incomes = require("../models/incomes")
const Expenses = require("../models/expenses")
const ExpensesCategories = require("../models/categories")
const { Op, Sequelize } = require("sequelize")
const round = require("../helpers/math")

function getMonthResume(month, year){
    //Valor total das receitas no mês
    //Valor total das despesas no mês
    //Saldo final no mês
    //Valor total gasto no mês em cada uma das categorias
    return new Promise(async function(resolve, reject){
        const initialDate = new Date(`${year}-${month}`)
        initialDate.setDate(1)
        const endDate = new Date(`${year}-${month}`)
        endDate.setMonth(endDate.getMonth() + 1)
        endDate.setDate(0)
        //TODO validation
        query = { data: {
            [Op.between]: [initialDate.toISOString(), endDate.toISOString()]
        }}
        const incomes = await Incomes.findAll({where: {...query}}).catch(err => res.status(500).send(err))
        const expenses = await Expenses.findAll({where: {...query}}).catch(err => res.status(500).send(err))
        const totalIncomes = round(incomes.reduce((previousValue, currentIncome) => previousValue + currentIncome.valor, 0))
        const totalExpenses = round(expenses.reduce((previousValue, currentIncome) => previousValue + currentIncome.valor, 0))
        const totalMonth = round(totalIncomes - totalExpenses)
        const categories = await ExpensesCategories.findAll().catch(err => res.status(500).send(err))
        const categoriesObject = categories.reduce((acc, val) => {
            acc[val.id] = val.nome
            return acc
        }, {})
        const categoriesSumP = categories.map(async category => {
            return await Expenses.findOne({
                attributes: [
                    [Sequelize.fn('sum', Sequelize.col('valor')), 'total'],
                    "id_categoria"
                ],
                where: { 
                    ...query,
                    id_categoria: `${category.id}`
                },
                group: "id_categoria"
            })
        })
        Promise.all(categoriesSumP).then(categoriesSums => {
            const values = categoriesSums.map(categoriesSum => {
                if (!!categoriesSum) {
                    return JSON.parse(JSON.stringify(categoriesSum))
                } else {
                    return false    
                }
            }).filter(x => !!x)
            const expensesByCategory = values.map(categoriesSum => ({
                category: categoriesObject[categoriesSum.id_categoria],
                total: categoriesSum.total
            }))
            resolve({totalIncomes, totalExpenses, totalMonth, expensesByCategory})
        })
    })
}

module.exports = { getMonthResume }