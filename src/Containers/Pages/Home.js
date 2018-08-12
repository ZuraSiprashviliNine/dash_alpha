
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

import { SWITCH_PAGE, ADD_PAGE_HISTORY } from '../../Actions/NavigationActions';

import Particles from 'react-particles-js';
import { SET_HOME, SET_HOME_PARTICLES } from '../../Actions/HomeActions';
import { HomeContent } from '../../Components/HomeContent';
import { getPageSlag } from '../../Helpers/GetPageSlag';

class Element extends React.Component{

    render(){
        return (
            <div
                id="home_page"
                className="page animated"
                style={{backgroundImage: `url('https://newevolutiondesigns.com/images/freebies/black-wallpaper-16.jpg')`}}>
                <Particles
                    className={'particles-wrapper'}
                    canvasClassName={'particles-canvas'}
                    params={{
                        ...this.props.Home.particles,
                        particles: {
                            ...this.props.Home.particles.particles,
                            number: {
                                value: window.screen.width / 10
                            }
                        }
                    }}/>
                <HomeContent info={this.props.Common.info}/>
            </div>
        )
    }
}

class Home_Page extends React.Component{
    constructor(props){
        super(props);

        this._checkValidStates = this._checkValidStates.bind(this);
        this._checkStates = this._checkStates.bind(this);
    }

    _checkValidStates(){
        return (
            this.props.Home.particles !== null
        ) ? true : false;
    }

    _checkStates(props){
        if(this._checkValidStates() === true){
            if(this.props.Home.ready === false){
                this.props.setHomeReady(true);
            }
        }else{
            if(this.props.Home.particles === null){
                this.props.setHomeParticles();
            }
        }
    }
    
    componentDidMount(){
        if(this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)){
            this.props.setPage(getPageSlag(this.props.match.path));
        }
        
        this._checkStates(this.props);
    }

    componentDidUpdate(props){
        if(this._checkValidStates() === true){
            if(this.props.Home.ready === false){
                this.props.setHomeReady(true);
            }
        }else{
            // this._checkStates(props);
        }
    }
    
    render(){
        return this.props.Home.ready === true ? <Element {...this.props} /> : <Loading/>; 
    }
}

const states = (state) => {
    return {
        Navigation: state.NavigationReducer,
        Home: state.HomeReducer,
        Common: state.CommonReducer
    };
};
const actions = (dispatch) => {
    return {
        setHomeReady: (ready = false) => {
            dispatch(SET_HOME(ready));
        },
        setHomeParticles: () => {
            dispatch(SET_HOME_PARTICLES());
        },
        setPage: (page) => {
            dispatch(SWITCH_PAGE(page));
            dispatch(ADD_PAGE_HISTORY(page));
        }
    };
};

export default connect(states, actions)(Home_Page);