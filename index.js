const express = require("express")
const { sequelize, runMigration } = require("./db")
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/routes');

//TODO stop when error
sequelize.authenticate()
console.log('Connection has been established successfully.')

runMigration
    .then(() => {
        app.emit('ready')
    })
    .catch(error => {
        console.log(error)
    })

//TODO add .env
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/', mainRoutes)

app.on('ready', function() { 
    app.listen(port, function(){ 
        console.log(`App listening on port ${port}`) 
    }); 
}); 

module.exports = app
