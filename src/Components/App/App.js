import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playListName: "Chill Playlist",
      playListTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({ playListTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = tracks.filter((currTrack) => currTrack.id !== track.id);

    this.setState({ playListTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playListTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: "My Playlist",
        playListTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>
            Ja<span className="highlight">mmm</span>ing
          </h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
              <Playlist
                playListName={this.state.playListName}
                playListTracks={this.state.playListTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
