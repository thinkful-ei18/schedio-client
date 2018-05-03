import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import SignUpPage from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/signup" component={SignUpPage} />
				<Route exact path="/login" component={Login} />
			</div>
		);
	}
}
export default App;
