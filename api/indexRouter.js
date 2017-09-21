// api/indexRouter.js

const routes = require('express').Router();  
const v1Router = require('./v1/v1Router'); 

routes.use('/v1', v1Router); 

module.exports = routes; 