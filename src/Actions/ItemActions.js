
import Axios from 'axios';

export function SET_ITEM_READY(s){
    return {
        type: 'SET_ITEM_READY',
        payload: s
    }
}

export function SET_ITEM_DATA(slag){
    return {
        type: 'SET_ITEM_DATA',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                slag: slag,
                isBack: true
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

export function UNSET_ITEM_DATA(){
    return {
        type: 'UNSET_ITEM_DATA',
        payload: null
    }
}

export function SET_ITEM_LIKE(id, ident, isFront){
    return {
        type: 'SET_ITEM_LIKE',
        payload: new Promise((resolve, reject) => {

            Axios.post('http://localhost:3000/api/gallery/data', {
                like: true,
                id: id,
                ident: ident
            })
                .then(response => {
                    resolve({
                        id: response.data,
                        isFront: isFront,
                        ident: ident
                    })
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function UNSET_ITEM_LIKE(id, ident, isFront){
    return {
        type: 'UNSET_ITEM_LIKE',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                unlike: true,
                id: id,
                ident: ident
            })
                .then(response => {
                    resolve({
                        id: response.data,
                        isFront: isFront,
                        ident: ident
                    })
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_ITEM_VIEW(id, ident, isBack){
    return {
        type: 'SET_ITEM_VIEW',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                view: true,
                id: id,
                ident: ident
            })
                .then(response => {
                    resolve({
                        id: response.data,
                        isBack: isBack,
                        ident: ident
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}