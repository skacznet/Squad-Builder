import * as actionTypes from '../actions/actionTypes';
import { all, takeEvery } from 'redux-saga/effects';

import { authSaga, logoutSaga, userLogoutSaga, checkAuthSaga, refreshTokenSaga } from './auth';
import { saveSquadSaga, editSquadSaga } from './squadBuilder';
import { loadSquadsSaga, deleteSquadSaga } from './mySquads';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_START, authSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_USER_LOGOUT, userLogoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_AUTH, checkAuthSaga),
        takeEvery(actionTypes.AUTH_REFRESH_TOKEN, refreshTokenSaga)
    ]);
}

export function* watchSquadBuilder() {
    yield all([
        takeEvery(actionTypes.SB_SAVE_SQUAD, saveSquadSaga),
        takeEvery(actionTypes.SB_EDIT_SQUAD, editSquadSaga)
    ]);
}

export function* watchMySquads() {
    yield all([
        takeEvery(actionTypes.MS_LOAD_SQUADS, loadSquadsSaga),
        takeEvery(actionTypes.MS_DELETE_SQUAD, deleteSquadSaga)
    ]);
}