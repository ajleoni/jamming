import react from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList.js'

export class Playlist extends react.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'} />
        <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true}/>
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
    );
  }
}




