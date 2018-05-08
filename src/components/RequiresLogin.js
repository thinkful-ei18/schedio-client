import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom'

class RequiresLogin extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <Link to="/login" >
      <FlatButton {...this.props} label="Login" />
      </Link>
    );
  }
}

export default RequiresLogin;