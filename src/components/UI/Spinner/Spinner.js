import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Spinner.css';
import Fade from '@material-ui/core/Fade';

const spinner = props => {
    return (
        <Fade in timeout={300}>
            <div className={classes.SpinnerWrapper} {...props}>
                <div>
                    <CircularProgress color="primary" />
                </div>
            </div>
        </Fade>
    );
}

export default spinner;