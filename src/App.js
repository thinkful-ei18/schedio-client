import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUpPage from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventCreation from './components/EventCreation';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/dashboard/eventcreate" component={EventCreation} />
				</Switch>
			</div>
		);
	}
}
export default App;
