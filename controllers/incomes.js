const Incomes = require("../models/incomes")
const { Op } = require("sequelize");

function findAllIncomes(description) {
    return new Promise(async function(resolve, reject){
        let query;
        if (!!description) {
            query = { descricao: {
                [Op.like]: `%${description}%`,
            }}
        }
        try {
            const res = await Incomes.findAll({
                where:{
                    ...query,
                }
            })
            resolve(res)
        } catch (sequelizeError) {
            reject(sequelizeError)
        }
    })
}

function findOneIncome(id) {
    return new Promise(async function(resolve, reject){
        Incomes.findOne({
            where: { id: id }
        }).then(queryRes => {
            if (queryRes) {
                resolve(queryRes)
            } else {
                reject(404)    
            }
        })
    })
}

function insertIncome(expense) {
    return new Promise(async function(resolve, reject){
        let id = await Incomes.max('id')
        expense['id'] = id+1
        Incomes.create(expense)
            .then(expenseAdded => resolve(expenseAdded))
            .catch(err => reject(err))
    })
}

function updateIncome(expense, id) {
    return new Promise(async function(resolve, reject){
        Incomes.update(expense, {
            where: {
              id: id
            }
        }).then(queryRes => {
            if (queryRes > 0) {
                Incomes.findOne({
                    where: {
                        id: id
                    }
            }).then(queryRes => 
                resolve(queryRes)
                )
            } else {
                reject(404)
            }
        })
    })
}

function removeIncome(id) {
    return new Promise(async function(resolve, reject){
        Incomes.destroy({
            where: { id: id }
        }).then(queryRes => {
            if (queryRes > 0) {
                resolve({message: "deleted"})
            } else {
                reject(404)
            }
        })
    })
}

function findIncomesByDate (month, year) {
    return new Promise(async function(resolve, reject){
        const initialDate = new Date(`${year}-${month}`)
        initialDate.setDate(1)
        const endDate = new Date(`${year}-${month}`)
        endDate.setMonth(month)
        endDate.setDate(0)
        query = { data: {
            [Op.between]: [initialDate.toISOString(), endDate.toISOString()]
        }}
        Incomes.findAll({where: {
            ...query
        }})
        .then(queryRes => resolve(queryRes))
        .catch(err => reject(err))
    })
}

module.exports = {
    findAllIncomes,
    insertIncome,
    updateIncome,
    removeIncome,
    findOneIncome,
    findIncomesByDate
}