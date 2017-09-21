require ('dotenv').config(); 

const app = require('express')(); 
const bodyParser = require('body-parser'); 
const routes = require('./routes'); 
const indexRouter = require('./api/indexRouter'); 

const port = process.env.PORT; 
const bunyan = require('bunyan'); 

var log = bunyan.createLogger({name: 'dexcom-test-app'}); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', routes); 
app.use('/api', indexRouter);

app.listen(port, () => {
    log.info('App is listening on port ', port); 
}); 