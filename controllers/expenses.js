const Expenses = require("../models/expenses")
const ExpensesCategories = require("../models/categories")
const { Op } = require("sequelize");

function findAll(description) {
    return new Promise(async function(resolve, reject){
        let query;
        if (!!description) {
            query = { descricao: {
                [Op.like]: `%${description}%`,
            }}
        }
        try {
            const res = await Expenses.findAll({
                where:{
                    ...query,
                },
                include: ExpensesCategories
            })
            resolve(res)
        } catch (sequelizeError) {
            reject(sequelizeError)
        }
    })
}

function findOne(id) {
    return new Promise(async function(resolve, reject){
        Expenses.findOne({
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

function insert(expense) {
    return new Promise(async function(resolve, reject){
        let id = await Expenses.max('id')
        expense['id'] = id+1
        Expenses.create(expense)
            .then(expenseAdded => resolve(expenseAdded))
            .catch(err => reject(err))
    })
}

function update (expense, id) {
    return new Promise(async function(resolve, reject){
        Expenses.update(expense, {
            where: {
              id: id
            }
        }).then(queryRes => {
            if (queryRes > 0) {
                Expenses.findOne({
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

function remove (id) {
    return new Promise(async function(resolve, reject){
        Expenses.destroy({
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

function findByDate (month, year) {
    return new Promise(async function(resolve, reject){
        const initialDate = new Date(`${year}-${month}`)
        initialDate.setDate(1)
        const endDate = new Date(`${year}-${month}`)
        endDate.setMonth(month)
        endDate.setDate(0)
        query = { data: {
            [Op.between]: [initialDate.toISOString(), endDate.toISOString()]
        }}
        Expenses.findAll({where: {
            ...query
        }})
        .then(queryRes => resolve(queryRes))
        .catch(err => reject(err))
    })
}

module.exports = { findAll, insert, update, remove, findOne, findByDate }