
const itemReducer = (state = {
    ready: false,
    data: null
}, action) => {

    switch(action.type){
        case 'SET_ITEM_READY': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }

        case 'SET_ITEM_DATA_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }

        case 'UNSET_ITEM_DATA': {
            state = {
                ...state,
                data: action.payload,
                ready: false
            };
            break;
        }

        case 'SET_ITEM_LIKE_FULFILLED': {
            let _date = new Date();
            state = {
                ...state,
                data: {
                    ...state.data,
                    likes: [
                        ...state.data.likes,
                        {
                            time: `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}/${_date.getHours() + 1}:${_date.getMinutes()}:${_date.getSeconds()}`,
                            ident: action.payload.ident
                        }
                    ]
                }
            };
            break;
        }

        case 'UNSET_ITEM_LIKE_FULFILLED': {

            state = {
                ...state,
                data: {
                    ...state.data,
                    likes: state.data.likes.filter(like => like.ident !== action.payload.ident)
                }
            };
            break;
        }
        
        case 'SET_ITEM_VIEW_FULFILLED': {
            let _date = new Date();
            state = {
                ...state,
                data: {
                    ...state.data,
                    views: [
                        ...state.data.views, 
                        {
                            time: `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}/${_date.getHours() + 1}:${_date.getMinutes()}:${_date.getSeconds()}`,
                            ident: action.payload.ident
                        }
                    ]
                }
            };
            break;
        }
        
        default: {
            break;
        }
    }

    return state;
};

export default itemReducer;