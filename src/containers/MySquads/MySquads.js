import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import Squad from '../../components/MySquads/Squad/Squad';
import classes from './MySquads.css';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import materialClasses from '../../assets/style/material.css';

const MySquads = props => {

    const squadsData = props.squadsData;

    const [isJustDeleted, setIsJustDeleted] = useState(false);
    const [isJustSaved, setIsJustSaved] = useState(false);
    const [editRedirect, setEditRedirect] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [squadToDelete, setSquadToDelete] = useState(null);

    // Check if the user is authenticated and load his squads
    useEffect(() => {
        props.checkAuth();
        props.loadSquads(props.token, props.userId);
    }, []);

    // Set information about notifications if they should appear.
    // It's done on unmount to fix the issue with disappearing notifications when spinner is remounting the component.
    useEffect(() => {
        return () => {
            if(props.isJustSaved === true || props.isJustDeleted === true) {
                setIsJustDeleted(props.isJustDeleted);
                setIsJustSaved(props.isJustSaved);
            }
        }
    });

    // Reset notifications information (if the state changed), so they won't appear in the next action.
    useEffect(() => {
        if(props.isJustSaved === true || props.isJustDeleted === true) {
            props.resetNotifications();
        }
    }, [isJustDeleted, isJustSaved]);

    // Redirect to Squad Builder to edit selected squad
    const onEditRedirectHandler = squad => {
        setEditRedirect(<Redirect to={{
            pathname: "/",
            search: "?mode=edit",
            state: {squad: squad}
        }} />);
    }
    
    // Save selected squad's id and open the modal
    const onDeleteHandler = squadId => {
        setSquadToDelete(squadId);
        setOpenModal(true);
    }

    // Reset selected squad's id and close the modal
    const closeModalHandler = () => {
        setSquadToDelete(null);
        setOpenModal(false);
    }

    // Send deletion request, close the modal and reset selected squad's id
    const onDeleteConfirmedHandler = () => {
        props.deleteSquad(props.token, props.userId, squadToDelete);
        setOpenModal(false);
        setSquadToDelete(null);
    }

    // Show spinner if something is being loaded
    let spinner = '';
    if(props.loading) {
        spinner = <Spinner />;
    }

    // If squads are loaded, map them to single Squad elements and show them on the list
    let squads = '';
    let squadsElement = '';
    if(squadsData) {
        if(squadsData.length) {
            squads = squadsData.map((squad) => (
                <Squad key={squad.id} name={squad.squadName} formation={squad.formation.type} onEdit={() => onEditRedirectHandler(squad)} onDelete={() => onDeleteHandler(squad.id)}></Squad>
            ));
            squadsElement = <ul className={classes.SquadsList}>
                                {squads}
                            </ul>
        } else {
            squadsElement = <h3>You don't have any squads yet.</h3>;
        }
    }

    return (
        <div className={materialClasses.MaterialContainer}>
            {spinner}
            {editRedirect}
            <Slide direction="down" in={isJustDeleted} mountOnEnter unmountOnExit>
                <SnackbarContent className={materialClasses.SuccessSnackbar} message={<span><strong>Done!</strong> Squad has been deleted.</span>} />
            </Slide>
            <Slide direction="down" in={isJustSaved} mountOnEnter unmountOnExit>
                <SnackbarContent className={materialClasses.SuccessSnackbar} message={<span><strong>Done!</strong> Squad has been saved.</span>} />
            </Slide>
            <Slide direction="down" in={props.error} mountOnEnter unmountOnExit>
                <SnackbarContent className={materialClasses.ErrorSnackbar} message={<span><strong>Error!</strong> Try again.</span>} />
            </Slide>
            <Modal aria-labelledby="simple-modal-title" open={openModal} onClose={closeModalHandler}>
                <div className={materialClasses.ModalContainer}>
                    <h3 id="simple-modal-title">Are you sure you want to delete this squad?</h3>
                    <Button variant="contained" style={{marginRight: "10px"}} color="secondary" onClick={onDeleteConfirmedHandler}>Delete</Button>
                    <Button variant="contained" onClick={closeModalHandler}>Cancel</Button>
                </div>
            </Modal>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={materialClasses.Paper}>
                        <div>
                            <h2>My Squads</h2>
                        </div>
                        {squadsElement}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        loadSquads: (token, userId) => dispatch(actions.loadSquads(token, userId)),
        deleteSquad: (token, userId, squadId) => dispatch(actions.deleteSquad(token, userId, squadId)),
        resetNotifications: () => dispatch(actions.resetNotifications()),
        checkAuth: () => dispatch(actions.checkAuth())
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.mySquads.loading,
        squadsData: state.mySquads.squadsData,
        isJustDeleted: state.mySquads.isJustDeleted,
        isJustSaved: state.mySquads.isJustSaved,
        error: state.mySquads.error !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySquads);