// api/v1/dexcomController.js

const bunyan        = require('bunyan'); 
const log           = bunyan.createLogger({name: 'dexcom-api-controller'}); 
const qs            = require('querystring'); 
const http          = require('https');  
const dexcomHost    = process.env.DEXCOM_API_HOST; 

module.exports = { 

    getCalibrations: function (req, res, next){
       
        var accessToken = req.query.code; 
        var startDate   = req.query.startDate; 
        var endDate     = req.query.endDate; 

        if(!startDate || !endDate){
            res.status(400).json({message: 'Bad request'}); 
        }

        if(!accessToken){
            res.status(401).json({message: 'Unauthorized request'}); 
        }

        var queryStringParms = '/v1/users/self/calibrations?startDate=' + startDate + '&endDate=' + endDate; 

        var options = {
          "method": "GET",
          "hostname": dexcomHost,
          "port": null,
          "path": queryStringParms,
          "headers": {
            "Authorization": "Bearer " + accessToken,
            }
        };
        
        var dexcomRequest = http.request(options, function (dexcomResult) {
          var chunks = [];
        
          dexcomResult.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          dexcomResult.on("end", function () {
            var body = Buffer.concat(chunks);                     
            res.status(200).send(JSON.parse(body));             
          });
        });        
        dexcomRequest.end();
    }, 

    getDevices: function(req, res, next){

        var accessToken = req.query.code; 
        var startDate   = req.query.startDate; 
        var endDate     = req.query.endDate; 

        if(!startDate || !endDate){
            res.status(400).json({message: 'Bad request'}); 
        }

        if(!accessToken){
            res.status(401).json({message: 'Unauthorized request'}); 
        }

        var queryStringParms = '/v1/users/self/devices?startDate=' + startDate + '&endDate=' + endDate; 

        var options = {
          "method": "GET",
          "hostname": dexcomHost,
          "port": null,
          "path": queryStringParms,
          "headers": {
            "Authorization": "Bearer " + accessToken,
            }
        };
        
        var dexcomRequest = http.request(options, function (dexcomResult) {
          var chunks = [];
        
          dexcomResult.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          dexcomResult.on("end", function () {
            var body = Buffer.concat(chunks);                     
            res.status(200).send(JSON.parse(body));             
          });
        });
        
        dexcomRequest.end();
    }, 

    getEgvs: function(req, res, next){

        var accessToken = req.query.code; 
        var startDate   = req.query.startDate; 
        var endDate     = req.query.endDate; 

        if(!startDate || !endDate){
            res.status(400).json({message: 'Bad request'}); 
        }

        if(!accessToken){
            res.status(401).json({message: 'Unauthorized request'}); 
        }

        var queryStringParms = '//v1//users/self/egvs?startDate=' + startDate + '&endDate=' + endDate; 

        var options = {
          "method": "GET",
          "hostname": dexcomHost,
          "port": null,
          "path": queryStringParms,
          "headers": {
            "Authorization": "Bearer " + accessToken,
            }
        };
        
        var dexcomRequest = http.request(options, function (dexcomResult) {
          var chunks = [];
        
          dexcomResult.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          dexcomResult.on("end", function () {
            var body = Buffer.concat(chunks);                     
            res.status(200).send(JSON.parse(body));             
          });
        });
        
        dexcomRequest.end();
    }, 

    getEvents: function(req, res, next){
        
        var accessToken = req.query.code; 
        var startDate   = req.query.startDate; 
        var endDate     = req.query.endDate; 

        if(!startDate || !endDate){
            res.status(400).json({message: 'Bad request'}); 
        }

        if(!accessToken){
            res.status(401).json({message: 'Unauthorized request'}); 
        }

        var queryStringParms = '/v1/users/self/events?startDate=' + startDate + '&endDate=' + endDate; 

        var options = {
            "method": "GET",
            "hostname": dexcomHost,
            "port": null,
            "path": queryStringParms,
            "headers": {
            "Authorization": "Bearer " + accessToken,
            }
        };
        
        var dexcomRequest = http.request(options, function (dexcomResult) {
            var chunks = [];
        
            dexcomResult.on("data", function (chunk) {
            chunks.push(chunk);
            });
        
            dexcomResult.on("end", function () {
            var body = Buffer.concat(chunks);                     
            res.status(200).send(JSON.parse(body));             
            });
        });
        
        dexcomRequest.end();
    }, 

    putStatistics: function(req, res, next){
        
        var accessToken = req.query.code; 
        var startDate   = req.query.startDate; 
        var endDate     = req.query.endDate; 
        var statisticsData = req.body; 

        if(!startDate || !endDate){
            res.status(400).json({message: 'Bad request'}); 
        }

        if(!accessToken){
            res.status(401).json({message: 'Unauthorized request'}); 
        }

        if(!statisticsData){
            res.status(400).json({message: 'Bad request'}); 
        }

        var queryStringParms = '/v1/users/self/statistics?startDate=' + startDate + '&endDate=' + endDate; 

        var options = {
            "method": "POST",
            "hostname": dexcomHost,
            "port": null,
            "path": queryStringParms,
            "headers": {
            "Authorization": "Bearer " + accessToken,
            "Content-type": 'Application/json'
            }
        };
        
        var dexcomRequest = http.request(options, function (dexcomResult) {
            var chunks = [];
        
            dexcomResult.on("data", function (chunk) {
            chunks.push(chunk);
            });
        
            dexcomResult.on("end", function () {
            var body = Buffer.concat(chunks);                     
            res.status(200).send(JSON.parse(body));             
            });
        });

        dexcomRequest.write(JSON.stringify(statisticsData));

        dexcomRequest.end();
        
    }

}