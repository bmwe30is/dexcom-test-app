// api/v1/dexcomRouter.js

const bunyan = require('bunyan'); 
const route = require('express').Router({ mergeParams: true }); 
const log = bunyan.createLogger({name: 'dexcom-router'}); 
const tokenUtil = require('../../tokenUtil'); 
const middleware = require('./middleware'); 
const controller = require('./dexcomController'); 

const clientId = process.env.CLIENT_ID; 
const clientSecret = process.env.CLIENT_SECRET; 
const dexcomHost = process.env.DEXCOM_API_HOST; 

route.get('/', (req, res) => {
    res.status(200).json({message: 'hi from V1 dexcom path.'}); 
}); 

route.get('/calibrations', controller.getCalibrations, (req, res) => {

}); 

route.get('/devices', controller.getDevices, (req, res) => {
    
});

route.get('/egvs', controller.getEgvs, (req, res) => {
    
});

route.get('/events', controller.getEvents, (req, res) => {
    
});

route.post('/statistics', controller.putStatistics, (req, res) => {
    
});

module.exports = route; 

