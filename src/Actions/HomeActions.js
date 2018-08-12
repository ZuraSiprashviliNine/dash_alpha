
import Axios from 'axios';

export function SET_HOME(s) {
    return {
        type: 'SET_HOME',
        payload: s
    }
}

export function SET_HOME_PARTICLES(){
    return {
        type: 'SET_HOME_PARTICLES',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/particles', {
                active: true
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