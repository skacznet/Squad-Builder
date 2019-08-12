import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
    userId: null,
    token: null,
    loading: false,
    error: null,
    signInByFrom: false,
    justLoggedOut: false
}

// Start loading - set 'loading' to 'true' so the spinner can be shown and reset an authentication error.
const authLoading = (state, action) => {
    return updateObject(state, {loading: true, error: null});
}

// Successful authentication - turn off loading state, reset errors, set user data, check if the user is signed in by form or automatically
const authSuccess = (state, action) => {
    return updateObject(state, {loading: false, error: null, userId: action.userId, token: action.token, signInByFrom: action.signInByFrom});
}

// Authentication failed - turn off loading state, set the error
const authFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
}

// User is logged out automatically - reset user data, don't show the notification
const authLogout = (state, action) => {
    return updateObject(state, {userId: null, token: null, justLoggedOut: false});
}

// User is logged out by clicking 'logout' - reset user data, show the notification
const authUserLogout = (state, action) => {
    return updateObject(state, {userId: null, token: null, justLoggedOut: true});
}

// Reset authentication error
const authResetError = (state, action) => {
    return updateObject(state, {error: null});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authLoading(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_USER_LOGOUT: return authUserLogout(state, action);
        case actionTypes.AUTH_RESET_ERROR: return authResetError(state, action);
        default: return state;
    }
}

export default reducer;