const client_id = '75303dba12f84b6ea9705ce53d1e2bf4';
const redirectURI ='http://localhost:3000/';
let accessToken = '';
let expiresIn ='';
let url='';

class Spotify {
  getAccessToken() {
    if (accessToken) {return accessToken};
    url = window.location.href;
    const regEx = /access_token=([^&]*)/;
    const regEx2 = /expires_in=([^&]*)/;
    accessToken = url.match(regEx);
    if (accessToken) {
        console.log(accessToken);
        expiresIn = url.match(regEx2);
        if (expiresIn) {
          console.log(expiresIn);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
        }
        return accessToken;
    }     
    if (!accessToken) {
      url=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location.href = url;
        console.log(url);
        };  
  }
  search(searchTerm) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const data = {
      method: 'GET',
      header: {Authorization: 'Bearer ${accessToken}', 'Content-Type': 'application/json'}
    }
    const getData = async () => {
      try { 
        const response = await fetch(endpoint, data);
        if (response.ok) { 
          const jsonResponse = await response.json(); 
          return jsonResponse;   }
        throw new Error('Request failed!')  }
      catch(error) {console.log(error)} };
      return getData;
  }
};

export default new Spotify();