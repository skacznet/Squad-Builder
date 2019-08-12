import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import materialClasses from '../../../assets/style/material.css';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { updateObject } from '../../../shared/helpers';

const SignInForm = props => {

    const [formControls, setFormControls] = useState({
        email: {
            id: 'email',
            value: '',
            label: 'Your e-mail',
            autoComplete: 'username',
            type: 'text'
        },
        password: {
            id: 'password',
            value: '',
            label: 'Your password',
            autoComplete: 'current-password',
            type: 'password'
        }
    });
    
    // Prevent default submit action and send the request with authentication data
    const submitHandler = (event) => {
        event.preventDefault();
        props.onSignIn(formControls.email.value, formControls.password.value);
    }
    
    // Update state when user changes input value
    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(formControls, {[controlName]: updateObject(formControls[controlName], {value: event.target.value})});
        setFormControls(updatedControls);
    }

    // Convert form controls to an array
    const formControlsArray = [];
    for(let key in formControls) {
        formControlsArray.push({
            id: key,
            config: formControls[key]
        });
    }

    // Map form controls array to TextField elements
    const form = formControlsArray.map(control => (
        <TextField
            key={control.config.id}
            required
            label={control.config.label}
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={control.config.autoComplete}
            value={control.config.value}
            name={control.config.id}
            type={control.config.type}
            onChange={(event) => inputChangeHandler(event, control.config.id)}
        />
    ));

    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={submitHandler}>
                {form}
                <Button className={materialClasses.SubmitBtn} variant="contained" color="primary" size="large" type="submit" fullWidth>SIGN IN</Button>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(actions.authStart(email, password, false))
    }
}

export default connect(null, mapDispatchToProps)(SignInForm);