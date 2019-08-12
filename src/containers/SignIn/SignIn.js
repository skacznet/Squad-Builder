import React, { useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import materialClasses from '../../assets/style/material.css';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';

import SignInForm from '../../components/Auth/SignInForm/SignInForm';
import SignUpForm from '../../components/Auth/SignUpForm/SignUpForm';
import Spinner from '../../components/UI/Spinner/Spinner';

const SignIn = props => {

    // Reset error information if we already received it.
    useEffect(() => {
        if(props.authError) {
            props.onResetError();
        }
    }, []);

    // Set content for not authenticated users.
    let content =   <Grid container spacing={24} justify="center">
                        <Grid item xl={3} lg={4} md={6} sm={12}>
                            <Paper className={materialClasses.Paper}>
                                <SignInForm />
                            </Paper>
                        </Grid>
                        <Grid item xl={3} lg={4} md={6} sm={12}>
                            <Paper className={materialClasses.Paper}>
                                <SignUpForm />
                            </Paper>
                        </Grid>
                    </Grid>;

    // Show the spinner when waiting for the response and redirect the user after successful authentication.
    if(props.isLoading) {
        content = <Spinner />
    } else if(props.isAuth) {
        content = <Redirect to="/" />
    }
    
    return (
        <div className={materialClasses.MaterialContainer}>
            <Slide direction="down" in={props.authError !== null} mountOnEnter unmountOnExit>
                <SnackbarContent className={materialClasses.ErrorSnackbar} message={<span><strong>Error!</strong> Try again.</span>} />
            </Slide>
            {content}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isLoading: state.auth.loading,
        authError: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetError: () => dispatch(actions.resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);