const client_id = '75303dba12f84b6ea9705ce53d1e2bf4';
const client_secret = '88f60068391d4960a27c7bae26619f1c';

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});

let expectedResponse = {
    "access_token": "NgCXRKc...MzYjw",
    "token_type": "bearer",
    "expires_in": 3600
 };

 How to use the access_token
 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
     --header "Authorization: Bearer NgCXRK...MzYjw"


/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

 var request = require('request'); // "Request" library

 var client_id = 'CLIENT_ID'; // Your client id
 var client_secret = 'CLIENT_SECRET'; // Your secret
 
 // your application requests authorization
 var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
   },
   form: {
     grant_type: 'client_credentials'
   },
   json: true
 };
 
 request.post(authOptions, function(error, response, body) {
   if (!error && response.statusCode === 200) {
 
     // use the access token to access the Spotify Web API
     var token = body.access_token;
     var options = {
       url: 'https://api.spotify.com/v1/users/jmperezperez',
       headers: {
         'Authorization': 'Bearer ' + token
       },
       json: true
     };
     request.get(options, function(error, response, body) {
       console.log(body);
     });
   }
 });