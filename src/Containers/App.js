
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

class Element extends React.Component{
    render(){
        return (
            <div
                id="App">
                <div id="Application">
                    <Router>
                        <div id="RouterContainer">
                            <Switch>
                                <Route
                                    path="/"
                                    exact={true}
                                    component={() => (
                                        <div>
                                            hi
                                        </div>
                                    )}/>
                                <Route
                                    component={() => (
                                        <div>
                                            bye
                                        </div>
                                    )}/>
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
    }

    componentDidUpdate(props){
        if(this.props.Reducer.ready === false){
            this.props.set(true);
            console.log('app started');
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