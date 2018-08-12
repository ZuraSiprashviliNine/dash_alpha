
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

import {
    Redirect
} from 'react-router-dom';
import { SWITCH_PAGE, ADD_PAGE_HISTORY } from '../../Actions/NavigationActions';

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
    
    componentDidMount(){
        if(this.props.Navigation.currentPage !== this.props.match.path){
            this.props.setPage(this.props.match.path);
        }
    }
    
    render(){
        if(this.props.User.user){
            return <Redirect to="/admin"/>;            
        }else{
            return this.props.App.ready === true ? <Element {...this.props} /> : <Loading/>;
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
        }
    };
};

export default connect(states, actions)(Forgot_Page);