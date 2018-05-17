import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Edit from 'material-ui/svg-icons/image/edit';
import { changeFirstName, changeUserName} from '../store/actions/users';
import { fetchUserEvents } from '../store/actions/eventlist.actions';
import Dialog from 'material-ui/Dialog';
import Password from './ResetPassword';
import FlatButton from 'material-ui/FlatButton';
import './Account.css';
export class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      field: null,
      firstname: '',
      username: '',
      openPassword: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUserEvents());
  }

    handleOpen = (field) => {
      const { google, local } = this.props.currentUser.user;
      google ? '' : this.setState({ open: true, field, [field]: local[field] });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleOnChange = e => {
      const { value } = e.target;
      const { field } = this.state;
      this.setState({ [field]: value });
    }

    handleSubmit = e => {
      e.preventDefault();
      const { dispatch, currentUser } = this.props;
      const { field } = this.state;
      if (field === 'username') {
        return dispatch(changeUserName(currentUser.user.id, this.state[field]))
          .then(() => this.handleClose());
      }
      if (field === 'firstname') {
        return dispatch(changeFirstName(currentUser.user.id, this.state[field]))
          .then((user) => this.handleClose());
      }

    }

    handlePasswordOpen = () => {
      this.setState({
        openPassword: true
      });
    }
    render() {
      const renderEditIcon = () => {
        return (
          <Edit />
        );
      };
      const renderAccountInfo = (user) => {
        const { google, local } = user;
        return (
          <List>
            <ListItem primaryText="Account field" secondaryText={google ? 'google' : 'local'} disabled={true} />
            <Divider />
            <br />
            <ListItem primaryText="Name" secondaryText={google ? google.firstname : local.firstname} disabled={google ? true : false} rightAvatar={google ? '' : renderEditIcon()} onClick={() => this.handleOpen('firstname')} />
            <Divider />
            <ListItem primaryText={google ? 'Email' : 'Username'} secondaryText={google ? google.username : local.username} disabled={google ? true : false} rightAvatar={google ? '' : renderEditIcon()} onClick={() => this.handleOpen('username')} />
            <Divider />
            <ListItem primaryText='Password' secondaryText={'change password'} disabled={google ? true : false} rightAvatar={google ? '' : renderEditIcon()} onClick={this.handlePasswordOpen} />
            <Divider />
          </List>
        );
      };
      const renderInput = (field) => {
        return (
          <div style={styles.inputContainer}>
            <label style={styles.label}>{field}</label>
            <input id={field} name={field} value={this.state[field]} onChange={this.handleOnChange} style={styles.input} />
          </div>

        );

      };

      const renderDialog = () => {

        const { field } = this.state;

        return (
          <Dialog
            title={`Change ${field}`}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <form onSubmit={this.handleSubmit}>
              {renderInput(field)}
              <FlatButton label="Submit" fullWidth={true} type="submit" />
            </form>

          </Dialog>
        );
      };

      const { user } = this.props.currentUser;
      return (
        <main style={styles.container} className="root">
          <Password openPassword={this.state.openPassword} closePassword={() => this.setState({ openPassword: false })} user={user} />
          {renderDialog()}
          <section style={styles.titleContainer}>
            <h2>Your personal info</h2>
            <p style={styles.desc}>Manage your name, email and personal contact infomation to help others find you.</p>
          </section>
          <section style={styles.entryContainer}>
            {user ? renderAccountInfo(user) : ''}
          </section>
        </main>
      );
    }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Account);

const styles = {
  container: {
    maxWidth: '1080px',
    backgroundColor: 'white',
    margin: '0 auto',
    transition: 'all 0.5s ease',
  },
  titleContainer: {
    width: '300px',
    padding: 10,
    margin: '0 auto'
  },
  desc: {
    color: 'rgba(0,0,0,0.65)',
    fontSize: '18px',
    lineHeight: '30px'
  },
  entryContainer: {
    width: '300px',
    padding: 10,
    margin: '0 auto'
  },
  inputContainer: {
    padding: 16
  },
  label: {
    display: 'block',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  input: {
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
    padding: 10,
    paddingLeft: 5,
    width: '100%',
    marginBottom: 10,
    border: '1px solid rgba(16, 36, 94, 0.2)',
    borderWidth: 1
  },
  warning: {
    display: 'block',
    color: 'red',
    padding: 10
  }
};

