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
      url=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-private,user-read-private,user-read-email&redirect_uri=${redirectURI}`;
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
  savePlaylist(playlistName,tracks) {
    if(playlistName && tracks) {
      let accessToken = this.getAccessToken();
      const endpoint = 'https://api.spotify.com/v1/me';
      let data = {
      method: 'GET',
      headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'}
    }
      let userId;
      const queryAPI = async (endpoint,data) => {
      try { 
        const response = await fetch(endpoint, data);
        if (response.ok) { 
          const jsonResponse = await response.json(); 
          return jsonResponse;   }
        throw new Error('Request failed!')  }
      catch(error) {console.log(error)} };

      queryAPI(endpoint,data).then(result => {
        userId = result.id;
        console.log(userId);
        return userId
      }).then( userId => {
        const endpoint2 = `https://api.spotify.com/v1/users/${userId}/playlists`;
        let data2 = data;
        data2.method = 'POST'
        data2.body = JSON.stringify({name: playlistName, public: false});
        console.log(`this playlist called: ${playlistName} has ${tracks.length} tracks`);
        console.log(data2);
        queryAPI(endpoint2,data2).then( result => {
          console.log(result);
          let playlistId = result.id;
          return playlistId;
        }).then( (playlistId) => {
          const endpoint3 = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
          let data3 = data;
          data3.body = JSON.stringify(tracks); 
          JSON.stringify()
          queryAPI(endpoint3,data3)
        }

        )
      });
      } else {return};
  }
};

export default new Spotify();