import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Edit from 'material-ui/svg-icons/image/edit'
export function Account(props) {

    const renderEditIcon = () => {
        return (
            <Edit />
        )
    }
    const renderAccountInfo = (user) => {
        const { google, local } = user
        return (
            <List>
                <ListItem primaryText="Account type" secondaryText={google ? 'google' : 'local'} disabled={true} />
                <Divider />
                <br />
                <ListItem primaryText="Name" secondaryText={google ? google.firstname : local.firstname} disabled={false} rightAvatar={renderEditIcon()} />
                <Divider />
                <ListItem primaryText={google ? 'Email' : 'Username'} secondaryText={google ? google.username : local.username} disabled={false} rightAvatar={renderEditIcon()} />
                <Divider />
                <ListItem primaryText='Password' secondaryText={'change password'} disabled={false} rightAvatar={renderEditIcon()} />
                <Divider />

            </List>
        )
    }

    const { user } = props.currentUser
    return (
        <main style={styles.container}>
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
