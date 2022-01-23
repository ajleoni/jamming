import react from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


export class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    let accessToken = Spotify.getAccessToken();
    this.setState({accessToken: accessToken});
  }
  search(searchTerm, accessToken) {
    const response = Spotify.search(searchTerm, accessToken);
    response.then( (result) => {
      const tracks = result.tracks.items.map(
        (track) => {
          let object={};
          object.id = track.id;
          object.name = track.name;
          object.artist = track.artists[0].name;
          object.album = track.album.name;
          object.uri = track.uri;
          return object;
        }
      )
      this.setState({searchResults: tracks});
      return tracks;
     })
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackURIs);
    console.log(Spotify.playlistId);
    this.setState({playlistId: Spotify.playlistId});
  }
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks.push(track);
    this.setState({playlistTracks: newPlaylistTracks});
  }
  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter( savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylistTracks});
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/> 
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}



