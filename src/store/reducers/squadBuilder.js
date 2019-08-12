import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
    squadSaved: false,
    loading: false,
    error: null
};

// Squad saving started - set 'loading' to 'true' so the spinner can be shown, reset an error.
const saveStart = (state) => {
    return updateObject(state, {loading: true, error: null});
}

// Squad saved successfully - hide the loading spinner, reset an error, set 'saved' flag to true, so we can redirect the user.
const saveSuccess = (state) => {
    return updateObject(state, {loading: false, error: null, squadSaved: true});
}

// Squad saving failed - hide the loading spinner, set an error, set 'saved' flag to false, so the user won't be redirected.
const saveError = (state, action) => {
    return updateObject(state, {loading: false, error: action.error, squadSaved: false});
}

// Reset information about saving
const resetSquadSaved = (state) => {
    return updateObject(state, {squadSaved: false});
}

// Reset an error
const resetError = (state) => {
    return updateObject(state, {error: null});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SB_SAVE_START: return saveStart(state, action);
        case actionTypes.SB_SAVE_SUCCESS: return saveSuccess(state, action);
        case actionTypes.SB_SAVE_ERROR: return saveError(state, action);
        case actionTypes.SB_RESET_SAVED: return resetSquadSaved(state, action);
        case actionTypes.SB_RESET_ERROR: return resetError(state, action);
        default: return state;
    }
}

export default reducer;