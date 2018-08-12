
import Axios from 'axios';

export function SET_COMMON_READY(s){
    return {
        type: 'SET_COMMON_READY',
        payload: s
    }
}

export function SET_ARTIST(){
    return {
        type: 'SET_ARTIST',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/artist')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SET_INFO(){
    return {
        type: 'SET_INFO',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/info')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export function SEND_CONTACT_MESSAGE(message){
    return {
        type: 'SEND_CONTACT_MESSAGE',
        payload: new Promise((resolve, reject) => {
            Axios.post('http://localhost:3000/api/contact', {
                user_name: message.user_name,
                email: message.email,
                subject: message.subject,
                message: message.message
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