import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppReducer from './Reducers/AppReducer';

export default createStore(
    combineReducers({
        AppReducer,
    }),
    {},
    applyMiddleware(
        thunk,
        logger,
        promise()
    )
)