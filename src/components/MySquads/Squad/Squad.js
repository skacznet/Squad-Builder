import React from 'react';
import classes from './Squad.css';
import Button from '@material-ui/core/Button';

const Squad = props => {
    return (
        <li className={classes.Squad}>
            <div className={classes.SquadContainer}>
                <span className={classes.SquadName}>{props.name}</span>
                <span>({props.formation})</span>
            </div>
            <div>
                <Button className={classes.squadBtn} variant="contained" style={{marginRight: "10px"}} onClick={props.onEdit}>Edit squad</Button>
                <Button className={classes.squadBtn} variant="contained" color="secondary" onClick={props.onDelete}>Delete</Button>
            </div>
        </li>
    );
}

export default Squad;