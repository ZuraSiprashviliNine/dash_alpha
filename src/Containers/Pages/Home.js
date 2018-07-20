
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

class Element extends React.Component{
    render(){
        return (
            <div
                id="home_page"
                className="page animated">
                asf
            </div>
        )
    }
}

class Home_Page extends React.Component{
    render(){
        return true === true ? <Element {...this.props} /> : <Loading/>; 
    }
}

const states = (state) => {
    return {

    };
};
const actions = (dispatch) => {
    return {

    };
};

export default connect(states, actions)(Home_Page);