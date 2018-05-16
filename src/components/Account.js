import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Edit from 'material-ui/svg-icons/image/edit'
import { changeFirstName, changeUserName, validatePassword, resetPassword } from '../store/actions/users'
import { fetchUserEvents } from '../store/actions/eventlist.actions'
import Dialog from 'material-ui/Dialog';
import Password from './ResetPassword';
export class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            field: null,
            firstname: '',
            username: '',
            openPassword: false
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchUserEvents())
    }

    handleOpen = (field) => {
        const { google, local } = this.props.currentUser.user
        google ? '' : this.setState({ open: true, field, [field]: local[field] })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOnChange = e => {
        const { value } = e.target
        const { field } = this.state
        console.log(this.state)
        this.setState({ [field]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { dispatch, currentUser } = this.props;
        const { field } = this.state
        console.log(field, this.state[field])
        if (field === 'username') {
            return dispatch(changeUserName(currentUser.user.id, this.state[field]))
                .then(() => dispatch(fetchUserEvents()))
        }
        if (field === 'firstname') {
            return dispatch(changeFirstName(currentUser.user.id, this.state[field]))
                .then((user) => console.log(user))
        }

    }

    handlePasswordOpen = () => {
        this.setState({
            openPassword: true
        })
    }
    render() {
        const renderEditIcon = () => {
            return (
                <Edit />
            )
        }
        const renderAccountInfo = (user) => {
            const { google, local } = user
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
            )
        }
        const renderInput = (field) => {
            return (
                <input id={field} name={field} value={this.state[field]} onChange={this.handleOnChange} />

            )

        }

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
                        <button type="submit">Submit</button>
                    </form>

                </Dialog>
            )
        }

        const { user } = this.props.currentUser
        return (
            <main style={styles.container}>
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
        )
    }

}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(Account)

const styles = {
    container: {
        maxWidth: '1080px',
        margin: '0 auto',
    },
    titleContainer: {
        width: '300px',
        padding: 10,
        margin: '0 auto'
    },
    desc: {
        color: 'rgba(0,0,0,0.65)',
        fontSize: '18px',
        lineHeight: "30px"
    },
    entryContainer: {
        width: '300px',
        padding: 10,
        margin: '0 auto'
    }
}
