import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://squad-builder-ab28c.firebaseio.com/'
});

export function* loadSquadsSaga(action) {
    yield put(actions.startLoadingSquads());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axiosInstance.get('/squads.json' + queryParams);
        const fetchedSquads = [];
        for(let key in response.data) {
            fetchedSquads.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.squadsLoaded(fetchedSquads));
    } catch(error) {
        yield put(actions.squadsLoadingFailed(error));
    }
}

export function* deleteSquadSaga(action) {
    yield put(actions.startDeletingSquad());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId +'"';
    try {
        const response = yield axiosInstance.get('/squads.json' + queryParams);
        if(response.data[action.squadId]) {
            yield axiosInstance.delete('/squads/' + action.squadId + '.json');
        } else {
            yield put(actions.squadDeletingFailed());
        }
        yield put(actions.squadDeleted());
        yield put(actions.loadSquads(action.token, action.userId));
    } catch(error) {
        yield put(actions.squadDeletingFailed(error));
    }
}