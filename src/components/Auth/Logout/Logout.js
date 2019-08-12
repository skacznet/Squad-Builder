import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/auth';

const Logout = props => {
    
    // Just redirect instantly.
    useEffect(() => {
        props.onLogout();
    });

    return <Redirect to="/" />;

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.userLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);