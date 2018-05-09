import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUpPage from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventCreation from './components/EventCreation';
import RequireAuth from './components/Utilities/RequireAuth';
import Experiment from './components/scratches/scratch';
import MapConfig from './components/scratches/MapConfig';
import WidgetsManager from './components/WidgetsManager';
/*======== RequireAuth is HOC that protects route from unauthorized visit ==========
	example: RequireAuth()(< Your Component that render the route >)
*/
const SecureDashboard = RequireAuth()(Dashboard);
const SecureEventCreation = RequireAuth()(EventCreation);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={SecureDashboard} />
          <Route exact path="/dashboard/eventcreate" component={SecureEventCreation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUpPage} />
          <Route exact path="/experiment" component={Experiment} />
          <Route exact path="/mapconfig" component={MapConfig} />
          <Route exact path="/dashboard/eventsetting" component={WidgetsManager} />
        </Switch>
      </div>
    );
  }
}
export default App;
