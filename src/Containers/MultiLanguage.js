
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../Components/Loading';
import { SET_LANGUAGES_READY } from '../Actions/MultiLanguageActions';

class Element extends React.Component{
    constructor(props){
        super(props);

        this._findKeyword = this._findKeyword.bind(this);
        this._translate = this._translate.bind(this);
        this._translateArray = this._translateArray.bind(this);
    }

    _findKeyword(keyword){
        for(let i = 0; i < this.props.Language.keywords.ref.length; i++){
            if(this.props.Language.keywords.ref[i].toLowerCase() === keyword.toLowerCase()){
                return i;
            }
        }
        return -1;
    }

    _translate(index, text){
        return index !== -1 ? this.props.Language.keywords.res[index] : text;
    }

    _translateArray(keywords){
        let _keywords = keywords.split(this.props.divider);
        let _result = [];
        for(let i = 0; i < _keywords.length; i++){
            _result.push(this._translate(this._findKeyword(_keywords[i]), _keywords[i]));
        }
        return _result.join(' ');
    }
    
    render(){
        if(!this.props.string){
            return this.props.divider
            ? this._translateArray(this.props.children)
            : this._translate(this._findKeyword(this.props.children), this.props.children); 
        }else{
            return 'wait';
        }
    }
}

class MultiLanguage extends React.Component{
    constructor(props){
        super(props);

        this._checkStates = this._checkStates.bind(this);
        this._checkValidStates = this._checkValidStates.bind(this);
    }

    _checkValidStates(){
        return (
            this.props.Language.languages !== null
            && this.props.Language.refCode !== null
            && this.props.Language.currentCode !== null
            && this.props.Language.divider !== null
            && Object.values(this.props.Language.keywords).every(k => k !== null)
        ) ? true : false;
    }

    _checkStates(props){
        if(this._checkValidStates() === true){
            if(this.props.Language.ready === false){
                this.props.setLanguagesReady(true);
            }
        }else{
            
        }
    }

    componentDidMount(){
        this._checkStates(this.props);
    }
    
    render(){
        return this.props.Language.ready === true ? <Element {...this.props}/> : <Loading/>;
    }
}

const states = (state) => {
    return {
        Language: state.LanguageReducer
    };
};
const actions = dispatch => {
    return {
        setLanguagesReady: (ready = true) => {
            dispatch(SET_LANGUAGES_READY(ready));
        }
    };
};

export default connect(states, actions)(MultiLanguage);