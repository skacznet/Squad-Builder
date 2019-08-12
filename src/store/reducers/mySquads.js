import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
    squadsData: null,
    loading: false,
    error: null,
    isJustSaved: false,
    isJustDeleted: false,
}

// Squads loading started - set 'loading' to 'true' so the spinner can be shown, reset an error.
const startLoading = (state) => {
    return updateObject(state, {loading: true, error: null});
}

// Squads loaded successfully - hide the loading spinner, reset an error and set loaded data.
const loadingCompleted = (state, action) => {
    return updateObject(state, {loading: false, error: null, squadsData: action.squadsData});
}


// Squads loading failed - hide the loading spinner, set an error.
const loadingFailed = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
}

// Squad deleting started - show the spinner, reset an error.
const startDeleting = (state) => {
    return updateObject(state, {loading: true, error: null});
}

// Squad deleted successfully - hide the spinner, reset an error, show a deletion notification.
const deletingCompleted = (state) => {
    return updateObject(state, {loading: false, error: null, isJustDeleted: true, isJustSaved: false});
}

// Squad deleting failed - hide the loading spinner, set an error.
const deletingFailed = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
}

// Reset all the notifications
const resetNotifications = (state, action) => {
    return updateObject(state, {isJustDeleted: false, isJustSaved: false});
}

// Squad successfully added or deleted - set the notification.
const savedNotification = (state) => {
    return updateObject(state, {isJustSaved: true, isJustDeleted: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MS_LOAD_SQUADS_START: return startLoading(state, action);
        case actionTypes.MS_LOAD_SQUADS_SUCCESS: return loadingCompleted(state, action);
        case actionTypes.MS_LOAD_SQUADS_ERROR: return loadingFailed(state, action);
        case actionTypes.MS_DELETE_SQUAD_START: return startDeleting(state, action);
        case actionTypes.MS_DELETE_SQUAD_SUCCESS: return deletingCompleted(state, action);
        case actionTypes.MS_DELETE_SQUAD_ERROR: return deletingFailed(state, action);
        case actionTypes.MS_RESET_NOTIFICATIONS: return resetNotifications(state, action);
        case actionTypes.MS_SAVED_NOTIFICATION: return savedNotification(state, action);
        default: return state;
    }
}

export default reducer;