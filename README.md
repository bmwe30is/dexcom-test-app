# Dexcom Test Application
This is a basic application aimed at the newly released (as of Sept 19, 2017) [Dexcom API](https://developer.dexcom.com/overview).

# Application Set Up
* Execute `npm install` to download and install dependencies.  See `package.json` for further information. 
*  You will need to create a `.env` file with the following entries: 
   
   `CLIENT_ID`: Your Dexcom client ID. 
      
   `CLIENT_SECRET`: Your Dexcom client secret.
   
   `DEXCOM_API_HOST`: Which Dexcom environment you want to use.  This can be either `sandbox-api.dexcom` or `api.dexcom.com`.  
   
   `PORT`: The port on which you want to run locally.  
* Run the application by executing `npm start`.  

# Pre-made Authentication Routes
There are currently four routes implemented: 
   * `/` a basic index page that lets you know the app is running in the browser. 
   * `/auth` this does the work of redirecting you to Dexcom's site where you can log in with a sandbox user or a prod user.  Once authenticated, the app will take you to the `/token` route. 
   * `/token` does the work of obtaining a bearer token once the user has authenticated to Dexcom.  Upon successful authentication by the user, you will receive a JSON payload with the bearer token as defined in [Dexcom's documentation](https://developer.dexcom.com/authentication).
   * `/token/:refreshToken` takes a `refresh token` as a path parameter and allows you to easily refresh your bearer token.   

# Dexcom API Wrapper Routes
The app wraps all five of the Dexcom endpoints using their URI pattern.  I simply pass on the query parameters back to Dexcom's API.  

# Note(s)
* The redirect URL's passed to the Dexcom authentication endpoints assume redirection back to `http://localhost:8080`.  
* Once you land on `http://localhost:8080/token?code=YOUR_AUTH_CODE&state=auth` (after hitting the `/token` path) you can simply refresh this page to get a new access token.  

# Outstanding Optimizations
* Right now I'm passing the bearer token as a query parameter to our wrapper API.  I'm using [Postman](https://www.getpostman.com/) to test the application locally, where I set the bearer token as a query parameter.  
 
   On the next revision, I'll transfer the token to an actual header where it's supposed to live.  

For example, when I `POST` to the `statistics` endpoint, I use the `code` query parameter (it should actually be named `bearerToken`): 

![Postman Screen Shot](/images/postman.png)
