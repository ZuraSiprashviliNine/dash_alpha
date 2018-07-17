import Axios from 'axios';

export function SET(appState){
    return {
        type: 'SET',
        payload: appState
    }
};