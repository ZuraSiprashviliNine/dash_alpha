
const galleryReducer = (state = {
    ready: false,
    info: null,
    page: -1,
    items: {
        current: -1,
        total: -1,
        perPage: -1
    },
    data: null,
    currentCategory: null,
    categories: null,
    user: null
}, action) => {
    switch(action.type){

        case 'SET_GALLERY_READY': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }

        case 'SET_GALLERY_USER': {
            state = {
                ...state,
                user: action.payload
            };
            break;
        }

        case 'SET_GALLERY_USER_LIKE': {
            state = {
                ...state,
                user: {
                    ...state.user,
                    likes: [
                        ...state.user.likes,
                        action.payload
                    ]
                }
            };
            break;
        }

        case 'SET_GALLERY_USER_VIEW': {
            state = {
                ...state,
                user: {
                    ...state.user,
                    views: [
                        ...state.user.views,
                        action.payload
                    ]
                }
            };
            break;
        }

        case 'UNSET_GALLERY_USER_LIKE': {
            state = {
                ...state,
                user: {
                    ...state.user,
                    likes: [
                        ...state.user.likes.filter(like => like !== action.payload)
                    ]
                }
            };
            break;
        }
        
        case 'SET_GALLERY_CURRENT_CATEGORY': {
            state = {
                ...state,
                currentCategory: action.payload
            };
            break;
        }

        case 'SET_GALLERY_CATEGORIES': {
            state = {
                ...state,
                categories: action.payload
            };
            break;
        }

        case 'SET_GALLERY_ITEMS_PER_PAGE_FULFILLED': {
            state = {
                ...state,
                items: {
                    ...state.items,
                    perPage: action.payload
                }
            };
            break;
        }
        
        case 'SET_GALLERY_INFO_FULFILLED': {
            state = {
                ...state,
                info: action.payload
            };
            break;
        }

        case 'SET_GALLERY_PAGE': {
            state = {
                ...state,
                page: action.payload
            };
            break;
        }

        case 'SET_GALLERY_ITEMS_CURRENT': {
            state = {
                ...state,
                items: {
                    ...state.items,
                    current: action.payload
                }
            };
            break;
        }

        case 'SET_GALLERY_ITEMS_TOTAL_FULFILLED': {
            state = {
                ...state,
                items: {
                    ...state.items,
                    total: action.payload
                }
            };
            break;
        }

        case 'SET_GALLERY_DATA_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }

        case 'SET_GALLERY_ITEM_LIKES_FULFILLED': {
            if(action.payload.isFront){
                state = {
                    ...state,
                    data: state.data.map(d => {
                        if(d._id === action.payload.id){
                            return {
                                ...d,
                                likes: d.likes + 1,
                            };
                        }else{
                            return d;
                        }
                    })
                };
            }
            break;
        }

        case 'UNSET_GALLERY_ITEM_LIKES_FULFILLED': {
            if(action.payload.isFront){
                state = {
                    ...state,
                    data: state.data.map(d => {
                        if(d._id === action.payload.id){
                            return {
                                ...d,
                                likes: d.likes - 1
                            };
                        }else{
                            return d;
                        }
                    })
                };
            }
            break;
        }
        
        default: {

            break;
        }
    }
    
    return state;
};

export default galleryReducer;