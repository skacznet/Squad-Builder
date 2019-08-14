import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import materialClasses from '../../../assets/style/material.css';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { updateObject } from '../../../shared/helpers';

const SignUpForm = props => {

    const [formControls, setFormControls] = useState({
        email: {
            id: 'email',
            value: '',
            label: 'Your e-mail',
            autoComplete: 'username',
            type: 'text',
            order: 0
        },
        password: {
            id: 'password',
            value: '',
            label: 'Your password',
            autoComplete: 'current-password',
            type: 'password',
            order: 1
        }
    });
    
    // Prevent default submit action and send the request with authentication data
    const submitHandler = (event) => {
        event.preventDefault();
        props.onSignUp(formControls.email.value, formControls.password.value);
    }
    
    // Update state when user changes input value
    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(formControls, {[controlName]: updateObject(formControls[controlName], {value: event.target.value})});
        setFormControls(updatedControls);
    }

    // Convert form controls to an array
    const formControlsArray = [];
    for(let key in formControls) {
        formControlsArray[formControls[key].order] = {
            id: key,
            config: formControls[key]
        }
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
            <h2>Don't have an account? Sign up!</h2>
            <form onSubmit={submitHandler}>
                {form}
                <Button type="submit" className={materialClasses.SubmitBtn} variant="contained" color="primary" size="large" fullWidth>SIGN UP</Button>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (email, password) => dispatch(actions.authStart(email, password, true))
    }
}

export default connect(null, mapDispatchToProps)(SignUpForm);