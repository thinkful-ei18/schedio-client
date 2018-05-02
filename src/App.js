import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import SignUpPage from './components/Signup';
import Login from './components/Login';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<LandingPage />
			</div>
		);
	}



export default App;
