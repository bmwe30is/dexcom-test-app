require ('dotenv').config(); 

const app = require('express')(); 
const routes = require('./routes'); 

const port = process.env.PORT; 
const bunyan = require('bunyan'); 

var log = bunyan.createLogger({name: 'dexcom-test-app'}); 

app.use('/', routes); 

app.listen(port, () => {
    log.info('App is listening on port ', port); 
}); 