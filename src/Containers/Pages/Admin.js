
import React from 'react';
import {connect} from 'react-redux';

import {Loading} from '../../Components/Loading';

import {
    Redirect,
    Link
} from 'react-router-dom';
import { SWITCH_PAGE, ADD_PAGE_HISTORY } from '../../Actions/NavigationActions';

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
    
    componentDidMount(){
        this.props.setPage(this.props.match.path);
    }
    
    render(){
        if(this.props.User.user){
            return this.props.App.ready === true ? <Element {...this.props}/> : <Loading/>;
        }else{
            return <Redirect to="/login" />;
        }
    }
}

const states = (state) => {
    return {
        App: state.AppReducer,
        User: state.UserReducer,
        Navigation: state.NavigationReducer
    };
};

const actions = (dispatch) => {
    return {
        setPage: (page) => {
            dispatch(SWITCH_PAGE(page));
            dispatch(ADD_PAGE_HISTORY(page));
        },
    };
};

export default connect(states, actions)(Admin_Page);