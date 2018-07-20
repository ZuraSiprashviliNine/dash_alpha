
import React from 'react';
import {connect} from 'react-redux';

import {Loading} from '../../Components/Loading';

import {
    Redirect,
    Link
} from 'react-router-dom';

class Element extends React.Component{
    render(){
        return (
            <div
                id="admin_page"
                className="page animated">
                authenticated congrats :)
            </div>
        )
    }
}

class Admin_Page extends React.Component{
    render(){
        if(this.props.User.user){
            return true === true ? <Element {...this.props}/> : <Loading/>;
        }else{
            return <Redirect to="/login" />;
        }
    }
}

const states = (state) => {
    return {
        App: state.AppReducer,
        User: state.UserReducer
    };
};

const actions = (dispatch) => {
    return {

    };
};

export default connect(states, actions)(Admin_Page);