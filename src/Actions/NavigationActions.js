
import Axios from 'axios';

export function SET_NAVIGATION_READY(s){
    return {
        type: 'SET_NAVIGATION_READY',
        payload: s
    }
}

export function SWITCH_PAGE(page){
    return {
        type: 'SWITCH_PAGE',
        payload: page
    }
}

export function ADD_PAGE_HISTORY(page){
    return {
        type: 'ADD_PAGE_HISTORY',
        payload: page
    }
}

export function SET_PAGES(){
    return {
        type: 'SET_PAGES',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/navigation')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_NAVIGATION_DRAWER(drawer){
    return {
        type: 'SET_NAVIGATION_DRAWER',
        payload: drawer
    }
}

export function SET_NAVIGATION_SCROLLED(scroll){
    return {
        type: 'SET_NAVIGATION_SCROLLED',
        payload: scroll
    }
}