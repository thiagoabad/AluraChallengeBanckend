const express = require('express')
const router = express.Router();
const Expenses = require("../models/Expenses")

router.get('/', (req, res) => {
    Expenses.findAll().then(queryRes => res.send(queryRes));
})
router.get('/:id', (req, res) => {
    //TODO validation
    Expenses.findAll({
        where: { id: req.params.id }
      }).then(queryRes => {
        if (queryRes.length == 0){
            res.status(404).send()
        } else {
            res.send(queryRes)
        }
      });
})
router.post('/', (req, res) => {
    //TODO auto increment
    //TODO validation
    Expenses.create(req.body).then(income => res.send(income))
})
router.put('/', (req, res) => {
    //TODO validation
    Expenses.update(req.body, {
        where: {
          id: req.body.id
        }
    }).then(queryRes => {
        if (queryRes == 0){
            res.status(404).send()
        } else {
            Expenses.findOne({
                where: { id: req.body.id }
            }).then(queryRes => res.send(queryRes));
        }
    });
})
router.delete('/:id', (req, res) => {
    //TODO validation
    Expenses.destroy({
        where: { id: req.params.id }
      }).then(queryRes => {
        console.log(queryRes)
        if (queryRes == 0){
            res.status(404).send()
        } else {
            res.send({message: "deleted"})
        }
      });
})
 
module.exports = router;
