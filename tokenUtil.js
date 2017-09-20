// tokenUtil.js

const qs = require('querystring'); 
const http = require('https'); 

const clientId = process.env.CLIENT_ID; 
const clientSecret = process.env.CLIENT_SECRET; 
const dexcomHost = process.env.DEXCOM_API_HOST; 

module.exports = { 

    getBearerToken: function(authCode, cb){

        var options = {
            "method": "POST",            
            "hostname": dexcomHost,
            "port": null,
            "path": "/v1/oauth2/token",
            "headers": {
              "content-type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache"
            }
          };
          
          var req = http.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function () {
              var body = Buffer.concat(chunks);              
              cb(body.toString()); 
            });
          });
          
          req.write(qs.stringify({ client_secret: clientSecret,
            client_id: clientId,
            code: authCode,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:8080/auth' }));
          req.end();

    }, 

    refreshToken: function(tokenId, cb){
        
        var options = {
          "method": "POST",
          "hostname": dexcomHost,
          "port": null,
          "path": "/v1/oauth2/token",
          "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
          }
        };
        
        var req = http.request(options, function (res) {
          var chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function () {
            var body = Buffer.concat(chunks);
            cb(body.toString()); 
          });
        });
        
        req.write(qs.stringify({ client_secret: clientSecret,
          client_id: clientId,
          refresh_token: tokenId,
          grant_type: 'refresh_token',
          redirect_uri: 'http://localhost:8080/auth' }));
        req.end();
    }
}