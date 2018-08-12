
import Axios from 'axios';

export function SET_GALLERY_READY(s) {
    return {
        type: 'SET_GALLERY_READY',
        payload: s
    }
}

export function SET_GALLERY_PAGE(page){
    return {
        type: 'SET_GALLERY_PAGE',
        payload: page
    }
}

export function SET_GALLERY_ITEMS_CURRENT(n){
    return {
        type: 'SET_GALLERY_ITEMS_CURRENT',
        payload: n
    }
}

export function SET_GALLERY_ITEMS_TOTAL(pars){
    return {
        type: 'SET_GALLERY_ITEMS_TOTAL',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                total: true,
                category: pars.category
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

export function SET_GALLERY_DATA(page, category, front = true){
    return {
        type: 'SET_GALLERY_DATA',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                page,
                category,
                front
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

export function SET_GALLERY_INFO(){
    return {
        type: 'SET_GALLERY_INFO',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/info')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_GALLERY_CURRENT_CATEGORY(cat){
    return {
        type: 'SET_GALLERY_CURRENT_CATEGORY',
        payload: cat
    }
}

export function SET_GALLERY_CATEGORIES(cats){
    return {
        type: 'SET_GALLERY_CATEGORIES',
        payload: cats
    }
}

export function SET_GALLERY_ITEMS_PER_PAGE(){
    return {
        type: 'SET_GALLERY_ITEMS_PER_PAGE',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                per_page: true
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

export function SET_GALLERY_USER(user){
    return {
        type: 'SET_GALLERY_USER',
        payload: user
    }
}

export function SET_GALLERY_USER_LIKE(id){
    return {
        type: 'SET_GALLERY_USER_LIKE',
        payload: id
    }
}

export function SET_GALLERY_USER_VIEW(id){
    return {
        type: 'SET_GALLERY_USER_VIEW',
        payload: id
    }
}

export function UNSET_GALLERY_USER_LIKE(id){
    return {
        type: 'UNSET_GALLERY_USER_LIKE',
        payload: id
    }
}

export function SET_GALLERY_ITEM_LIKES(id, ident, isFront){
    return {
        type: 'SET_GALLERY_ITEM_LIKES',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                like: true,
                id: id,
                ident
            })
                .then(response => {
                    resolve({
                        id:response.data,
                        isFront: isFront
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function UNSET_GALLERY_ITEM_LIKES(id, ident, isFront){
    return {
        type: 'UNSET_GALLERY_ITEM_LIKES',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/gallery/data', {
                unlike: true,
                id: id,
                ident
            })
                .then(response => {
                    resolve({
                        id: response.data,
                        isFront: isFront,
                    });
                })
                .catch(error => {
                    rejet(error);
                });
        })
    }
}