import { put, call, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

// Remove local storage data when the user is logged out automatically. Dispatch an action for logout, so we can change state in a reducer.
export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actions.logoutSucceed());
}

// Remove local storage data when the user clicked 'logout'. Dispatch an action for logout, so we can change state in a reducer.
export function* userLogoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actions.userLogoutSucceed());
}

// Dispatch an action to set the loading state.
// Send a request with authentication data using axios.
// After a successful response, set user data and token expiration date in local storage.
// Dispatch an action to set user data in state.
// Dispatch an action to refresh authentication token after it's expiration date.
// If authentication failed, dispatch an action to make changes in state. 
export function* authSaga(action) {
    yield put(actions.authLoading());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCxpwytWO2OViq-jJ37fKSlM66he0sffGY';

        if(!action.isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCxpwytWO2OViq-jJ37fKSlM66he0sffGY';
        }

    try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId, true));
        yield put(actions.refreshToken(response.data.refreshToken, response.data.expiresIn));

    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }
} 

// Make a request to get a new token when the old one expires (delay).
// After a successful response, set user data and token expiration date in local storage.
// Dispatch an action to set user data in state.
// Dispatch an action to refresh authentication token after it's expiration date.
// If authentication failed, dispatch an action to make changes in state. 
export function* refreshTokenSaga(action) {
    yield delay(action.expiresIn * 1000);

    const authData = {
        grant_type: "refresh_token",
        refresh_token: action.refreshToken
    }

    const url = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCxpwytWO2OViq-jJ37fKSlM66he0sffGY';

    try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);

        yield localStorage.setItem('token', response.data.id_token);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.user_id);
        yield put(actions.authSuccess(response.data.id_token, response.data.user_id, false));
        yield put(actions.refreshToken(response.data.refresh_token, response.data.expires_in));

    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

// Check if the user is authenticated. Dispatch a logout action if he's not or his token expired. If the user is authenticated, dispatch an action to set his data in state.
export function* checkAuthSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId, false));
        } else {
            yield put(actions.logout());
        }
    }
}