import React from 'react';
import { connect } from 'react-redux';

export function Account(props) {
    const renderAccountInfo = (user) => {
        return <div></div>
    }
    return (
        <main>
            <section>
                <header>Your personal info</header>
                <p>Manage your name, email and personal contact infomation to help others find you.</p>
            </section>

            <section>

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
