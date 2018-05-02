import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import MapWidget from './components/scratches/MapWidget';
import { Route } from 'react-router-dom';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<LandingPage />
			</div>
		);
	}
}

export default App;
