
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

import {
    Redirect
} from 'react-router-dom';

class Element extends React.Component{
    render(){
        return (
            <div
                id="forgot_page"
                className="page animated">
                forgot ? 3:)
            </div>
        )
    }
}

class Forgot_Page extends React.Component{
    render(){
        if(this.props.User.user){
            return <Redirect to="/admin"/>;            
        }else{
            return true === true ? <Element {...this.props} /> : <Loading/>;
        }
    }
}

const states = (state) => {
    return {
        User: state.UserReducer
    };
};

const actions = (dispatch) => {
    return {

    };
};

export default connect(states, actions)(Forgot_Page);