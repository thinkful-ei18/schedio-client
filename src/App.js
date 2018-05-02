import React, { Component } from 'react';
import LandingPage from './components/LandingPage'
import SearchBar from './containers/search_bar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar/>
        <LandingPage/>
      </div>
    );
  }
}

export default App;
