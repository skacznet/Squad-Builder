import React from 'react';
import classes from './Pitch.css';

const Pitch = props => {

    let positionCounters = [];

    // Count appearances of every type of position
    props.formation.positions.forEach(function (position) {
        if(positionCounters[position]) {
            positionCounters[position]++;
        } else {
            positionCounters[position] = 1;
        }
    });

    // Get all position types
    const positions = [...new Set(props.formation.positions)];

    let players = [];
    let playerCount = 0;

    // Create divs for each position type. We use our position counters to create a corrent number of divs for every position type.
    positions.forEach(function (position) {
        for(let i = 0; i < positionCounters[position]; i++) {
            if(!players[position]) {
                players[position] = [];
            }
            players[position].push(
                <div key={playerCount} className={[classes.Player, classes[position]].join(' ')} style={{backgroundColor: props.primaryColor, borderColor: props.secondaryColor}}>
                    <span>{props.lineup[playerCount]}</span>
                </div>
            );
            playerCount++;
        }
    });

    // Create wrappers for all the position types. We do this to make players with the same position countable in CSS.
    const positionWrappers = positions.map((position, index) =>
        <div id={position + '-wrapper'} key={index} className={classes[position + '-wrapper']}>
            {players[position]}
        </div>
    );

    let pitchToSave = '';
    if(props.isDownloading) {
        pitchToSave = <div id="PitchToSave" className={[classes.Pitch, classes.PitchToSave, classes['f-' + props.formation.type]].join(' ')}>
        <div className={classes.PitchWrapper}>
            <div className={classes.PitchInside}>
                <div className={classes.MiddleLine}></div>
                <div className={classes.MiddleCircle}></div>
                <div className={classes.KickOffSpot}></div>
                <div>
                    <div className={classes.Corner}></div>
                    <div className={classes.Corner}></div>
                    <div className={classes.Corner}></div>
                    <div className={classes.Corner}></div>
                </div>
                <div>
                    <div className={classes.PenaltyBox}></div>
                    <div className={classes.PenaltyBox}></div>
                </div>
                <div>
                    <div className={classes.PenaltySpot}></div>
                    <div className={classes.PenaltySpot}></div>
                </div>
                {positionWrappers}
            </div>
        </div>
    </div>;
    }

    return (
        <div className={classes.PitchContainer}>
            <div id="Pitch" className={[classes.Pitch, classes['f-' + props.formation.type]].join(' ')}>
                <div className={classes.PitchWrapper}>
                    <div className={classes.PitchInside}>
                        <div className={classes.MiddleLine}></div>
                        <div className={classes.MiddleCircle}></div>
                        <div className={classes.KickOffSpot}></div>
                        <div>
                            <div className={classes.Corner}></div>
                            <div className={classes.Corner}></div>
                            <div className={classes.Corner}></div>
                            <div className={classes.Corner}></div>
                        </div>
                        <div>
                            <div className={classes.PenaltyBox}></div>
                            <div className={classes.PenaltyBox}></div>
                        </div>
                        <div>
                            <div className={classes.PenaltySpot}></div>
                            <div className={classes.PenaltySpot}></div>
                        </div>
                        {positionWrappers}
                    </div>
                </div>
            </div>
            {/* Create hidden pitch for screenshots - it looks the same on every screen, so we can generate the same image for mobile and desktop users. */}
            {pitchToSave}
        </div>
    );
}

export default Pitch;