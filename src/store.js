import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppReducer from './Reducers/AppReducer';
import UserReducer from './Reducers/UserReducer';

export default createStore(
    combineReducers({
        AppReducer,
        UserReducer
    }),
    {},
    applyMiddleware(
        thunk,
        logger,
        promise()
    )
)