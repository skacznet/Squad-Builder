import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* saveSquadSaga(action) {
    yield put(actions.saveStart());
    const axiosInstance = axios.create({
        baseURL: 'https://squad-builder-ab28c.firebaseio.com/'
    });

    try {
        yield axiosInstance.post('/squads.json?auth=' + action.token, action.squadData);
        yield put(actions.saveSuccess());
        yield put(actions.saveSuccessNotification());
    } catch(error) {
        yield put(actions.saveError(error));
    }
}

export function* editSquadSaga(action) {
    yield put(actions.saveStart());
    const axiosInstance = axios.create({
        baseURL: 'https://squad-builder-ab28c.firebaseio.com/'
    });

    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.squadData.userId +'"';
    
    try {
        const response = yield axiosInstance.get('/squads.json' + queryParams);
        if(response.data[action.squadId]) {
            yield axiosInstance.patch('/squads/' + action.squadId + '.json', action.squadData);
        } else {
            yield put(actions.saveError());
        }
        yield put(actions.saveSuccess());
        yield put(actions.saveSuccessNotification());
    } catch(error) {
        yield put(actions.saveError(error));
    }
}

