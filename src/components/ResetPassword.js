import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { validatePassword, resetPassword } from '../store/actions/users'
import { fetchUserEvents } from '../store/actions/eventlist.actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'


export class ResetPassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isVerified: false,
            isWrong: false,
            isMatched: true,
            isSuccess: true
        }
        this.oldpass1 = null;
        this.oldpass2 = null;
        this.newpass = null;
    }

    handleClose = () => {
        this.props.closePassword()
    };

    handleSubmit = e => {
        e.preventDefault()
        const { isVerified } = this.state;
        const { dispatch, user } = this.props;

        if (!isVerified) {
            if (this.oldpass1.value !== this.oldpass2.value) {
                this.oldpass1.value = ''
                this.oldpass2.value = ''
                this.oldpass1.focus()
                return this.setState({
                    isMatched: false
                })
            }
            return dispatch(validatePassword(user.id, user.local.username, this.oldpass1.value))
                .then(() => {
                    this.setState({
                        isVerified: !this.state.isVerified
                    })
                })
                .catch(err => {
                    this.setState({
                        isWrong: true
                    })
                })
        }
        return dispatch(resetPassword(user.id, this.newpass.value))
            .then(() => {
                this.oldpass1 = null;
                this.oldpass2 = null;
                this.newpass = null;
                return this.setState({
                    isVerified: false,
                    isWrong: false,
                    isMatched: true,
                    isSuccess: true
                })
            })
            .then(() => this.handleClose())
            .catch(err => this.setState({ isSuccess: false }))

    }

    render() {
        const { isVerified, isMatched, isWrong, isSuccess } = this.state
        const { openPassword } = this.props;

        const renderInput = () => {
            return isVerified
                ? (<div style={styles.container}>
                    {!isSuccess ? 'Server is having some issue at the moment.' : ''}
                    <label htmlFor="newpassword" style={styles.label}>New Password</label>
                    <input type="password" id={`newpassword`} name={`newpassword`} ref={input => this.newpass = input} />
                </div>)
                : (
                    <div style={styles.container}>

                        <label htmlFor="oldpassword" style={styles.label}>password</label>
                        <input type="password" id={`oldpassword`} name={`oldpassword`} ref={input => this.oldpass1 = input} style={styles.input} placeholder="enter old password" />
                        <div style={styles.warning}>
                            {!isMatched ? `password does not match` : ''}
                            {isWrong ? `password is incorrect` : ''}
                        </div>
                        <label htmlFor="confirm" style={styles.label}>confirm password</label>
                        <input type="password" id={`confirm`} name={`confirm`} ref={input => this.oldpass2 = input} style={styles.input} placeholder="confirm password" />
                    </div>
                )
        }

        const renderDialog = () => {
            return (<Dialog
                title={isVerified ? `Enter new password.` : `Enter password`}
                modal={false}
                open={openPassword}
                onRequestClose={this.handleClose}
            >
                <form onSubmit={this.handleSubmit}>
                    {renderInput()}
                    <FlatButton type="submit" label="Submit" fullWidth={true} />
                </form>

            </Dialog>)
        }

        return (
            <div>
                {renderDialog()}
            </div>
        )


    }
}

export default connect()(ResetPassword)

const styles = {
    container: {
        padding: 5
    },
    label: {
        display: 'block',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    input: {
        boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
        padding: 8,
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
}