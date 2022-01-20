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
      searchResults: [
        {name: 'John Bon Jovi', artist:'Jon BJ', album: 'Rocked', id: '1', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhG6' },
        {name: 'Like a Virgin', artist:'Madonna', album: 'Immaculated', id:'2', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'}],
      playlistName: 'My Playlist',
      playlistTracks: [
        {name: 'Stronger', artist:'Britney Spears', album: 'Oops!... I Did It Again', id: '3', uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6' },
        {name: 'So Emotional', artist:'Whitney Houston', album: 'Whitney', id:'4', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'},
        {name: 'It\'s Not Right But It\'s Okay', artist:'Whitney Houston', album: 'My Love Is Your Love', id:'5', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'}]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.savePlaylist();
    Spotify.getAccessToken();
  }
  search(searchTerm) {
    console.log(searchTerm);
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
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
          <SearchBar /> 
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}



