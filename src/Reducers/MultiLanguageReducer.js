
const multiLanguageReducer = (state = {
    ready: false,
    languages: null,
    refCode: null,
    currentCode: null,
    divider: null,
    keywords: {
        ref: null,
        res: null
    }
}, action) => {
    switch(action.type){
        case 'SET_LANGUAGES_READY': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }

        case 'SET_LANGUAGES_DIVIDER_FULFILLED': {
            state = {
                ...state,
                divider: action.payload
            };
            break;
        }
        
        case 'SET_LANGUAGES_FULFILLED': {
            state = {
                ...state,
                languages: action.payload
            };
            break;
        }

        case 'SET_REF_CODE_FULFILLED': {
            state = {
                ...state,
                refCode: action.payload
            };
            break;
        }

        case 'SET_CURRENTCODE': {
            state = {
                ...state,
                currentCode: action.payload
            };
            break;
        }

        case 'SET_REF_KEYWORDS_FULFILLED': {
            state = {
                ...state,
                keywords: {
                    ...state.keywords,
                    ref: [
                        ...action.payload
                    ]
                }
            };
            break;
        }

        case 'SET_RES_KEYWORDS_FULFILLED': {
            state = {
                ...state,
                keywords: {
                    ...state.keywords,
                    res: [
                        ...action.payload
                    ]
                }
            };
            break
        }

        case 'UNSET_RES_KEYWORDS': {
            state = {
                ...state,
                keywords: {
                    res: action.payload
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

export default multiLanguageReducer;