import react from 'react';
import Spotify from '../../util/Spotify';
import './SearchBar.css';

export class SearchBar extends react.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search() {
    let accessToken = Spotify.getAccessToken();
    this.setState({accessToken: accessToken});
    this.props.onSearch(this.state.searchTerm, accessToken);
  }
  handleTermChange(e) {
    this.setState({searchTerm: e.target.value});
  }
  render() {
    return(
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button onClick={this.search} className="SearchButton">SEARCH</button>
      </div>
    );
  }
}



