const express = require('express')
const router = express.Router();
const Incomes = require("../models/incomes")

router.get('/', (req, res) => {
    Incomes.findAll().then(queryRes => res.send(queryRes))
})
router.get('/:id', (req, res) => {
    
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
