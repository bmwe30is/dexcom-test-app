// api/v1/v1Router.js

const bunyan = require('bunyan'); 
const routes = require('express').Router(); 
const dexcomRouter = require('./dexcomRouter'); 

routes.use('/dexcom', dexcomRouter); 

routes.get('/', (req, res) => {
    res.status(200).json({message: 'hi from V1 router path.'}); 
}); 

module.exports = routes; 