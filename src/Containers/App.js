
import React from 'react';
import {connect} from 'react-redux';

import {
    SET
} from '../Actions/AppActions.js'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import {
    Loading
} from '../Components/Loading';

import Pages from './Pages/Pages';

class Element extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div
                id="App"
                className="animated fadeIn">
                <div id="Application">
                    <Router>
                        <div id="RouterContainer">
                            <Switch>
                                <Route
                                    path="/"
                                    exact={true}
                                    component={Pages.Home}/>
                                <Route
                                    path="/admin"
                                    exact={true}
                                    component={Pages.Admin}/>
                                <Route
                                    path="/login"
                                    exact={true}
                                    component={Pages.Login}/>
                                <Route
                                    path="/forgot"
                                    exact={true}
                                    component={Pages.Forgot}/>
                                <Route
                                    component={({match}) => 
                                        <Redirect to={'/'} />
                                    }/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}


class App extends React.Component{

    componentDidMount(){
        if(this.props.Reducer.ready === false){
            this.props.set(true);
        }
    }

    componentDidUpdate(props){
        if(this.props.Reducer.ready === false){
            this.props.set(true);
        }
    }
    
    render(){
        return this.props.Reducer.ready === true ? <Element {...this.props}/> : <Loading />;
    }
}

const states = (state) => {
    return {
        Reducer: state.AppReducer
    };
};

const actions = (dispatch) => {
    return {
        set: (appState = false) => {
            dispatch(SET(appState));
        }
    };
};

export default connect(states, actions)(App);