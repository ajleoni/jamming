const client_id = '75303dba12f84b6ea9705ce53d1e2bf4';
const redirectURI ='http://localhost:3000/';
let accessToken = '';
let expiresIn ='';
let url='';

class Spotify {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    } else
    {
    url = window.location.href;
    const regEx = /access_token=([^&]*)/;
    const regEx2 = /expires_in=([^&]*)/;
    accessToken = url.match(regEx);
    if (accessToken) {
        accessToken = accessToken[1];
        expiresIn = url.match(regEx2);
        if (expiresIn) {
          expiresIn = expiresIn[1];
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
        }
        return accessToken;
    }  else if (!accessToken) {
      url=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location.href = url;
        console.log(url);
        console.log('03 Getting Auth Window')
        };  
      };
  }
  search(searchTerm, token) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const data = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
    }
    const getData = async () => {
      try { 
        const response = await fetch(endpoint, data);
        if (response.ok) { 
          const jsonResponse = await response.json(); 
          return jsonResponse;   }
        throw new Error('Request failed!')  }
      catch(error) {console.log(error)} };
      let searchResult = getData();
      return searchResult;
  }
};

export default new Spotify();