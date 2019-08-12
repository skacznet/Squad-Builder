import React from 'react';

import TextField from '@material-ui/core/TextField';
import materialClasses from '../../../assets/style/material.css';

const LineupForm = props => {

    // Map positions in selected formation to TextFields.
    const lineupInputs = props.formation.positions.map((position, index) => (
        <TextField className={materialClasses.SmallTextField}
            key={index}
            label={position}
            margin="normal"
            variant="outlined"
            fullWidth
            name={position}
            type="text"
            value={props.lineup[index]}
            onChange={(event) => props.onPlayerInputChange(event, index)}
        />
    ));

    return (
        <div>
            <h3 style={{marginTop: '0'}}>Lineup</h3>
            {lineupInputs}
        </div>
    )
}

export default LineupForm;