const express = require('express')
const router = express.Router();
const Incomes = require("../models/incomes")
const { Op } = require("sequelize");

router.get('/', (req, res) => {
    console.log(req.query.description)
    Incomes.findAll({
        where:{
            descricao: {
                [Op.like]: `%${req.query.description}%`,
            }
        }
    })
    .then(queryRes => res.send(queryRes))
    .catch(err => res.status(500).send(err))
})
router.get('/:ano/:mes', (req, res) => {
    const initialDate = new Date(`${req.params.ano}-${req.params.mes}`)
    initialDate.setDate(1)
    const endDate = new Date(`${req.params.ano}-${req.params.mes}`)
    endDate.setMonth(endDate.getMonth() + 1)
    endDate.setDate(0)
    //TODO validation
    query = { data: {
        [Op.between]: [initialDate.toISOString(), endDate.toISOString()]
    }}
    Incomes.findAll({where: {
        ...query
    }})
    .then(queryRes => res.send(queryRes))
    .catch(err => res.status(500).send(err))
})
router.get('/:id', (req, res) => {
    '${asd}'
    Incomes.findOne({
        where: { id: req.params.id }
    }).then(queryRes => {
        if (queryRes) {
            res.send(queryRes)
        } else {
            res.status(404).send(queryRes)    
        }
    })
    .catch(err => res.status(500).send(err))
})
router.post('/', async (req, res) => {
    //TODO validation
    let income = req.body
    let id = await Incomes.max('id')
    income['id'] = id+1
    Incomes.create(income)
    .then(incomeAdded => res.send(incomeAdded))
    .catch(err => res.status(500).send(err))
})
router.put('/:id', (req, res) => {
    //TODO validation
    Incomes.update(req.body, {
        where: {
          id: req.params.id
        }
    }).then(queryRes => {
        if (queryRes > 0) {
            Incomes.findOne({
                where: {
                    id: req.params.id
                }
        }).then(queryRes => 
            res.send(queryRes)
            )
        } else {
            res.status(404).send(queryRes)
        }
        console.log(queryRes)
    })
    .catch(err => res.status(500).send(err))
})
router.delete('/:id', (req, res) => {
    Incomes.destroy({
        where: { id: req.params.id }
    }).then(queryRes => {
        if (queryRes > 0) {
            res.send({message: "deleted"})
        } else {
            res.status(404).send()
        }
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router;
