import react from 'react';
import './TrackList.css';
import {Track} from '../Track/Track.js'

export class TrackList extends react.Component {
    render() {  
        const tracks = this.props.tracks.map( (track) => <Track key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove} /> );
        return (
            <div className="TrackList">
                <p>Tracklist</p>
                <p>{tracks}</p>
            </div>
        );
    }
}
