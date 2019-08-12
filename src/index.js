import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/style.css';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import squadBuilderReducer from './store/reducers/squadBuilder';
import mySquadsReducer from './store/reducers/mySquads';

import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas/index';
import { watchSquadBuilder } from './store/sagas/index';
import { watchMySquads } from './store/sagas/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    squadBuilder: squadBuilderReducer,
    mySquads: mySquadsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchSquadBuilder);
sagaMiddleware.run(watchMySquads);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
