import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { updateObject, friendlyFilename } from '../../shared/helpers';

import Pitch from '../../components/SquadBuilder/Pitch/Pitch';
import LineupForm from '../../components/SquadBuilder/LineupForm/LineupForm';
import SquadMainSettings from '../../components/SquadBuilder/SquadMainSettings/SquadMainSettings';
import Spinner from '../../components/UI/Spinner/Spinner';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import materialClasses from '../../assets/style/material.css';

import html2canvas from 'html2canvas';
import classes from './SquadBuilder.css';

const SquadBuilder = props => {

    const formations = {
        '3-4-3': { id: 0, type: '3-4-3', positions: ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'RM', 'LF', 'ST', 'RF'] },
        '3-5-2': { id: 1, type: '3-5-2', positions: ['GK', 'CB', 'CB', 'CB', 'LM', 'DM', 'CM', 'CM', 'RM', 'ST', 'ST'] },
        '4-5-1': { id: 2, type: '4-5-1', positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'DM', 'CM', 'CM', 'RM', 'ST'] },
        '4-4-2': { id: 3, type: '4-4-2', positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'] },
        '4-3-3': { id: 4, type: '4-3-3', positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'DM', 'CM', 'CM', 'LF', 'ST', 'RF'] },
        '5-4-1': { id: 5, type: '5-4-1', positions: ['GK', 'LB', 'CB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST'] },
        '5-3-2': { id: 6, type: '5-3-2', positions: ['GK', 'LB', 'CB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'ST', 'ST'] }
    };

    const [isSignedInByForm, setIsSignedInByForm] = useState(false);
    const [isJustLoggedOut, setIsJustLoggedOut] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#000000');
    const [secondaryColor, setSecondaryColor] = useState('#ffffff');
    const [squadName, setSquadName] = useState('');
    const [squadBuilderMode, setSquadBuilderMode] = useState('add');
    const [squadId, setSquadId] = useState(null);
    const [squadNameError, setSquadNameError] = useState(false);
    const [lineup, setLineup] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '' });
    const [downloadError, setDownloadError] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState(formations['3-4-3']);
    const [isDownloading, setIsDownloading] = useState(false);

    const formationChangeHandler = (event) => {
        setSelectedFormation(formations[event.target.value]);
    }

    const primaryColorClickHandler = (event) => {
        setPrimaryColor(event.target.getAttribute('data-color'));
    }

    const secondaryColorClickHandler = (event) => {
        setSecondaryColor(event.target.getAttribute('data-color'));
    }

    // Collect all the data needed to save the squad and send it to suitable action, according to current Squad Builder's mode
    const saveClickHandler = () => {
        if(squadName !== '') {
            const squadData = {
                userId: props.userId,
                formation: selectedFormation,
                squadName: squadName,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                lineup: lineup
            }
            if(squadBuilderMode === 'add') {
                props.onSquadSave(props.token, squadData);
            } else if(squadBuilderMode === 'edit') {
                props.onSquadEdit(props.token, squadData, squadId);
            }
        } else {
            setSquadNameError(true);
            window.scrollTo(0, 0);
        }
    }

    // Set downloading state (we have to show the pitch first), so we can run downloading procedure in useEffect 
    const downloadClickHandler = () => {
        setIsDownloading(true);
    }
    
    // Update lineup when the user changes player's name
    const playerInputChangeHandler = (event, inputIndex) => {
        const updatedLineup = updateObject(lineup, {[inputIndex]: event.target.value});
        setLineup(updatedLineup);
    }

    // Update squad's name when the user changes it. If input is not empty anymore, we can hide the error message.
    const squadNameInputChangeHandler = (event) => {
        if(event.target.value !== '') {
            setSquadNameError(false);
        }
        setSquadName(event.target.value);
    }

    // Switch Squad Builder's mode and set all the data needed to edit the squad.
    const switchToEditMode = squad => {
        setSquadBuilderMode('edit');
        setSquadId(squad.id);
        setSelectedFormation(squad.formation);
        setLineup(squad.lineup);
        setPrimaryColor(squad.primaryColor);
        setSecondaryColor(squad.secondaryColor);
        setSquadName(squad.squadName);
    }

    // Check if the user is authenticated, show sign in notification if needed and check if we should switch to edit mode.
    useEffect(() => {
        props.checkAuth();
        if(props.signInByFrom) {
            setIsSignedInByForm(true);
        }
        setIsJustLoggedOut(props.justLoggedOut);
        if(props.location.search) {
            const params = new URLSearchParams(props.location.search); 
            if(params.get('mode') === 'edit' && props.location.state) {
                const editSquad = props.location.state.squad;
                switchToEditMode(editSquad);
            }
        }
    }, []);

    // Reset the error information if we already received it.
    useEffect(() => {
        return () => {
            if(props.error === true) {
                props.onResetError();
            }
        }
    });

    // Save the hidden pitch div to an image and make a download request
    useEffect(() => {
        if(isDownloading == true) {
            html2canvas(document.querySelector("#PitchToSave"), {
                windowWidth: 1200,
                windowHeight: 800,
                width: 800,
                height: 800,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0
            }).then(canvas => {
                setDownloadError(false);
                const imageToDownload = canvas.toDataURL("image/png");
                let link = document.createElement("a");
                link.download = "squad_builder_" + friendlyFilename(squadName) + ".png";
                link.href = "data:" + imageToDownload;
                document.body.appendChild(link);
                link.click();
                setIsDownloading(false);
            }, error => {
                setDownloadError(true);
                setIsDownloading(false);
            });
        }
    }, [isDownloading]);

    // Set default content - for not authenticated users.
    let content =   <div className={classes.WelcomeContainer}>
                        <h1 className={classes.WelcomeHeading}>Welcome to Squad Builder!</h1>
                        <h2>You can set up your football squads here and save them as images. <span><Link to="/sign-in">Sign in and try it out!</Link></span></h2>
                    </div>;
    let spinner = '';
    let savedRedirect = '';

    // Show the Spinner if something is being loaded.
    if(props.loading) {
        spinner = <Spinner />;
    }

    // Redirect the user to My Squads after saving a squad.
    if(props.saved) {
        props.onSavedRedirect();
        savedRedirect = <Redirect to="/my-squads" />;
    }

    // Set the content for authenticated users
    if(props.isAuth) {
        content =   <div>
                        <h2>Squad Builder</h2>
                        <Grid id="mainGrid" container justify="center" spacing={24}>
                            <Grid item md={4} sm={5} xs={12}>
                                <Paper className={materialClasses.Paper}>
                                    <SquadMainSettings
                                        primaryColor={primaryColor}
                                        secondaryColor={secondaryColor}
                                        onPrimaryColorChange={primaryColorClickHandler}
                                        onSecondaryColorChange={secondaryColorClickHandler}
                                        allFormations={formations}
                                        formation={selectedFormation}
                                        onFormationChange={formationChangeHandler}
                                        squadName={squadName}
                                        squadNameError={squadNameError}
                                        onSquadNameInputChange={squadNameInputChangeHandler}
                                    />
                                </Paper>
                                <Paper style={{marginTop: '24px'}} className={materialClasses.Paper}>
                                    <LineupForm formation={selectedFormation} lineup={lineup} onPlayerInputChange={playerInputChangeHandler} />
                                </Paper>
                            </Grid>  
                            <Grid item md={8} sm={7} xs={12}>
                                <Pitch primaryColor={primaryColor} secondaryColor={secondaryColor} lineup={lineup} isDownloading={isDownloading} formation={selectedFormation} />
                            </Grid>    
                        </Grid>
                        <Fab onClick={saveClickHandler} aria-label="save" className={materialClasses.Fab}>
                            <SaveIcon />
                        </Fab>
                        <Fab onClick={downloadClickHandler} aria-label="download" className={materialClasses.FabSecond}>
                            <SaveAltIcon />
                        </Fab>
                    </div>;
    }
      
    return (
        <div className={materialClasses.MaterialContainer}>
            <Slide direction="down" in={isSignedInByForm} mountOnEnter>
                <SnackbarContent className={materialClasses.SuccessSnackbar} message={<span><strong>Hello!</strong> You're logged in now.</span>} />
            </Slide>
            <Slide direction="down" in={isJustLoggedOut} mountOnEnter>
                <SnackbarContent className={materialClasses.SuccessSnackbar} message={<span><strong>Bye!</strong> You've been logged out.</span>} />
            </Slide>
            <Slide direction="down" in={props.error || downloadError} mountOnEnter unmountOnExit>
                <SnackbarContent className={materialClasses.ErrorSnackbar} message={<span><strong>Error!</strong> Try again.</span>} />
            </Slide>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    {content}
                </Grid>
            </Grid>
            {spinner}
            {savedRedirect}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        signInByFrom: state.auth.signInByFrom,
        justLoggedOut: state.auth.justLoggedOut,
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.squadBuilder.loading,
        saved: state.squadBuilder.squadSaved,
        error: state.squadBuilder.error !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSquadSave: (token, squadData) => dispatch(actions.saveSquad(token, squadData)),
        onSquadEdit: (token, squadData, squadId) => dispatch(actions.editSquad(token, squadData, squadId)),
        onSavedRedirect: () => dispatch(actions.resetSaved()),
        onResetError: () => dispatch(actions.resetSquadBuilderError()),
        checkAuth: () => dispatch(actions.checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquadBuilder);