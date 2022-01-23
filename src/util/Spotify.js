class Spotify {
  constructor() {
    this.client_id = '75303dba12f84b6ea9705ce53d1e2bf4';
    this.redirectURI = 'http://localhost:3000/';
//    this.redirectURI = 'https://jam-ajleoni.surge.sh/';
    this.accessToken= '';
    this.expiresIn = '';
    this.url ='';
    this.playlistId='';
  }
  get clientId() {
    console.log(this.client_id);
    return this.client_id;
  }
  get token() {
    return this.accessToken;
  }
  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken
    } else
    {
    this.url = window.location.href;
    const regEx = /access_token=([^&]*)/;
    const regEx2 = /expires_in=([^&]*)/;
    this.accessToken = this.url.match(regEx);
    if (this.accessToken) {
        this.accessToken = this.accessToken[1];
        this.expiresIn = this.url.match(regEx2);
        if (this.expiresIn) {
          this.expiresIn = this.expiresIn[1];
          window.setTimeout(() => this.accessToken = '', this.expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
        }
        return this.accessToken;
    }  else if (!this.accessToken) {
      this.url=`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&scope=playlist-modify-private,user-read-private,user-read-email&redirect_uri=${this.redirectURI}`;
        window.location.href = this.url;
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
    const queryAPI = async (endpoint,data) => {
      try { 
        const response = await fetch(endpoint, data);
        if (response.ok) { 
          const jsonResponse = await response.json(); 
          return jsonResponse;   }
        throw new Error('Request failed!')  }
      catch(error) {console.log(error)} };
    if (this.playlistId) {
      let accessToken = this.getAccessToken();
      let endpoint = `https://api.spotify.com/v1/playlists/${this.playlistId}/tracks`;
      let data = {
      method: 'post',
      headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'}
      }
      data.body = JSON.stringify(tracks);
      queryAPI(endpoint,data);
    } else
    if(playlistName && tracks) {
      let accessToken = this.getAccessToken();
      let endpoint = 'https://api.spotify.com/v1/me';
      let data = {
      method: 'GET',
      headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'}
    }
      let userId;
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
          this.playlistId = playlistId;
          return playlistId;
        }).then( (playlistId) => {
          const endpoint3 = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
          let data3 = data;
          data3.body = JSON.stringify(tracks); 
          queryAPI(endpoint3,data3)
        }

        )
      });
      } else {return};
  }
};

export default new Spotify();