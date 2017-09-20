// routes.js
const bunyan = require('bunyan'); 
const routes = require('express').Router(); 
const log = bunyan.createLogger({name: 'routesLogger'}); 
const tokenUtil = require('./tokenUtil'); 

const clientId = process.env.CLIENT_ID; 
const clientSecret = process.env.CLIENT_SECRET; 
const dexcomHost = process.env.DEXCOM_API_HOST; 

routes.get('/', (req, res) => {
    res.status(200).json({message: 'hi from the main page'}); 
}); 


routes.get('/auth', (req, res) => {
    res.redirect('https://' 
                + dexcomHost
                + '/v1/oauth2/login?client_id= ' 
                + clientId 
                + '&redirect_uri= ' 
                + 'http://localhost:8080/token' 
                + '&response_type=code&scope=offline_access&state=auth'); 
}); 

routes.get('/token', (req, res, next) => {
        if(req.query.code) {            
            next(); 
        } else{
            res.status(403).json({message: 'unauthorized'}); 
        }
    }, (req, res) => {

        log.info('Getting bearer token.'); 
        var authCode = req.query.code; 

        tokenUtil.getBearerToken(authCode, function(bearerToken){
            res.status(200).json(JSON.parse(bearerToken)); 
        }); 
        
}); 

routes.get('/refreshToken/:tokenId', (req, res) => {
    var tokenId = req.params.tokenId; 
    if(tokenId){
        tokenUtil.refreshToken(tokenId, function(newToken){
            res.status(200).json(JSON.parse(newToken)); 
        }); 
    } else {
        res.status(403).json({message: 'Unable to refresh token'}); 
    }
})

module.exports = routes; 
