const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json')
const app = express(); //server initialization
app.use(bodyParser.json());// parses req body
app.use(express.urlencoded({extended:false}));//encode url
const connection = require('./connection')//db connection
connection.connect()
app.use('/users', require('./routes/user'))

app.use(function(err, req, res, next) {
    if (err.name === "ValidationError") {
        const errors = {};
        for (let field in err.errors) {
            errors[field] = err.errors[field].message;
        }
        return res.status(400).json({ message: 'Validation Error', errors: errors });
    }
    if (err.name === "MongoServerError" && err.code === 11000) {
        const keyValue = err.keyValue;
        const errorMessage = `Duplicate data, error for ${Object.keys(keyValue)[0]}: ${keyValue[Object.keys(keyValue)[0]]}`;
        return res.status(400).json({ message: 'Duplicate data error', error: errorMessage });
    }
    return res.send(err);
})

app.listen(config.port, ()=> {
    console.log(`server is running on ${config.port}`)
})

