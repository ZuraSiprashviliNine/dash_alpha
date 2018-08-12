import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import LanguageReducer from './Reducers/MultiLanguageReducer';

import AppReducer from './Reducers/AppReducer';
import UserReducer from './Reducers/UserReducer';

import NavigationReducer from './Reducers/NavigationReducer';

import HomeReducer from './Reducers/HomeReducer';
import CommonReducer from './Reducers/CommonReducer';
import GalleryReducer from './Reducers/GalleryReducer';
import ItemReducer from './Reducers/ItemReducer';

export default createStore(
    combineReducers({
        AppReducer,
        UserReducer,
        NavigationReducer,
        LanguageReducer,
        HomeReducer,
        CommonReducer,
        GalleryReducer,
        ItemReducer
    }),
    {},
    applyMiddleware(
        thunk,
        logger,
        promise()
    )
)