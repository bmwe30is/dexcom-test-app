// api/v1/middleware.js

const bunyan = require('bunyan'); 
const clientId = process.env.CLIENT_ID; 
const clientSecret = process.env.CLIENT_SECRET; 
const dexcomHost = process.env.DEXCOM_API_HOST; 

const log = bunyan.createLogger({name: 'v1-middleware-helper'}); 

module.exports = {

    

}