
import Axios from 'axios';

export function SET_LANGUAGES_READY(ready){
    return {
        type: 'SET_LANGUAGES_READY',
        payload: ready
    }
}

export function SET_LANGUAGES(){
    return {
        type: 'SET_LANGUAGES',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/language', {
                languages: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_REF_CODE(){
    return {
        type: 'SET_REF_CODE',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/language', {
                ref_lang: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_CURRENTCODE(code){
    return {
        type: 'SET_CURRENTCODE',
        payload: code
    }
}

export function SET_REF_KEYWORDS(){
    return {
        type: 'SET_REF_KEYWORDS',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/language', {
                keywords_ref: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function UNSET_RES_KEYWORDS(){
    return {
        type: 'UNSET_RES_KEYWORDS',
        payload: null
    }
}

export function SET_RES_KEYWORDS(code){
    return {
        type: 'SET_RES_KEYWORDS',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/language', {
                keywords_res: code
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_LANGUAGES_DIVIDER(){
    return {
        type: 'SET_LANGUAGES_DIVIDER',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/language', {
                divider: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}