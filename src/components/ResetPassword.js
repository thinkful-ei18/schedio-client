import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { validatePassword, resetPassword } from '../store/actions/users'
import { fetchUserEvents } from '../store/actions/eventlist.actions'
import Dialog from 'material-ui/Dialog';


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
                ? (<div>
                    {!isSuccess ? 'Server is having some issue at the moment.' : ''}
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" id={`newpassword`} name={`newpassword`} ref={input => this.newpass = input} />
                </div>)
                : (
                    <div>
                        {!isMatched ? `passwords doet not match` : ''}
                        {isWrong ? `password is incorrect` : ''}
                        <label htmlFor="oldpassword">Old Password</label>
                        <input type="password" id={`oldpassword`} name={`oldpassword`} ref={input => this.oldpass1 = input} />
                        <Divider />
                        <label htmlFor="confirm">confirm your password</label>
                        <input type="password" id={`confirm`} name={`confirm`} ref={input => this.oldpass2 = input} />
                    </div>
                )
        }

        const renderDialog = () => {
            return (<Dialog
                title={isVerified ? `Now enter your new password.` : `Enter your old password`}
                modal={false}
                open={openPassword}
                onRequestClose={this.handleClose}
            >
                <form onSubmit={this.handleSubmit}>
                    {renderInput()}
                    <button type="submit">Submit</button>
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