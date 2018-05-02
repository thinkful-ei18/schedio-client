import React, { Component } from 'react';
import SignUpPage from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
     
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={Login} />
      </div>
      </BrowserRouter>
    );

  }
}

export default App;
