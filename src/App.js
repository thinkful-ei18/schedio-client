import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SignUpPage from './components/Signup';
import Login from './components/Login';
import GoogleLog from './components/GoogleLog';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventCreation from './components/EventCreation';
import RequireAuth from './components/Utilities/RequireAuth';
import Experiment from './components/scratches/scratch';
import MapConfig from './components/Widgets/MapConfig';
import WidgetsManager from './components/WidgetsManager';
import Account from './components/Account';
import EventEdit from './components/EventEdit';
/*======== RequireAuth is HOC that protects route from unauthorized visit ==========
	example: RequireAuth()(< Your Component that render the route >)
*/
const SecureDashboard = RequireAuth()(Dashboard);
const SecureEventCreation = RequireAuth()(EventCreation);
const SecureAccount = RequireAuth()(Account);
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
          <Route exact path="/dashboard/mapconfig" component={MapConfig} />
          <Route exact path="/dashboard/eventsetting" component={WidgetsManager} />
          <Route exact path="/dashboard/eventsetting/edit" component={EventEdit} />
          <Route exact path="/googlelogin" component={GoogleLog} />
          <Route exact path="/account" component={SecureAccount} />
        </Switch>
      </div>
    );
  }
}
export default App;
