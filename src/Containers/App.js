
import React from 'react';
import {connect} from 'react-redux';

import {Scrollbars} from 'react-custom-scrollbars';
import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import {
    SET
} from '../Actions/AppActions.js'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import {
    Loading
} from '../Components/Loading';

import Pages from './Pages/Pages';
import { SET_LANGUAGES, SET_REF_CODE, SET_CURRENTCODE, SET_REF_KEYWORDS, SET_RES_KEYWORDS, SET_LANGUAGES_DIVIDER, SET_LANGUAGES_READY, UNSET_RES_KEYWORDS } from '../Actions/MultiLanguageActions.js';
import { SET_COMMON_READY, SET_ARTIST, SET_INFO } from '../Actions/CommonActions.js';

import Navigation from './Navigation.js';
import { SET_NAVIGATION_READY, SET_PAGES, SET_NAVIGATION_DRAWER, SET_NAVIGATION_SCROLLED } from '../Actions/NavigationActions.js';


class Element extends React.Component{
    constructor(props){
        super(props);

        this._handleScroll = this._handleScroll.bind(this);
    }

    _handleScroll(event){
        if(event.target.scrollTop > 50){
            if(!this.props.Navigation.scrolled){
                this.props.setNavigationScrolled(true);
            }
        }else{
            if(this.props.Navigation.scrolled){
                this.props.setNavigationScrolled(false);
            }
        }
    }

    render(){
        return (
            <div
                id="App"
                className="animated fadeIn">
                <Scrollbars
                    onScroll={this._handleScroll}
                    renderThumbVertical={() => {
                        return (
                            <div
                                className={'track-vertical'} style={{
                                backgroundColor: 'rgba(255,255,255, 4)'
                            }}/>
                        );
                    }}>
                    <div id="Application">
                        <Router>
                            <div id="RouterContainer">
                                <Navigation
                                    setDrawer={this.props.setNavigationDrawer}
                                    changeLang={this.props._setLanguageLang}/>
                                <Switch>
                                    <Route
                                        path="/"
                                        exact={true}
                                        component={({match}) => 
                                            <Redirect to="/home_page" />
                                        }/>
                                    <Route
                                        path="/home_page"
                                        exact={true}
                                        component={Pages.Home}/>
                                    <Route
                                        path="/about"
                                        exact={true}
                                        component={Pages.About}/>
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
                                        path="/gallery"
                                        exact={true}
                                        component={({match}) => (
                                            <Redirect
                                                to="/gallery/page/0/category/all"/>
                                        )}/>
                                    <Route
                                        path="/gallery/page/:page/category/:category"
                                        exact={true}
                                        component={Pages.Gallery}/>
                                    <Route
                                        path="/gallery/item/:slag"
                                        exact={true}
                                        component={Pages.Item}/>
                                    <Route
                                        component={({match}) => 
                                            <Redirect to="/home_page" />
                                        }/>
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}


class App extends React.Component{
    constructor(props){
        super(props);

        this._checkStates = this._checkStates.bind(this);
        this._checkValidStates = this._checkValidStates.bind(this);
        this._setLanguageLang = this._setLanguageLang.bind(this);
    }


    _setLanguageLang(lang){
        this.props.setLanguagesReady(false);
        let setDefault = () => {
            const LocalLanguage = Storage.get('language');
            if(LocalLanguage){
                this.props.setCurrentCode(LocalLanguage);
                this.props.setResKeywords(LocalLanguage);
            }else{
                Storage.set('language', 'ge');
                this.props.setCurrentCode('ge');
                this.props.setResKeywords('ge');
            }
        };

        if(!lang){
            setDefault();
        }else{
            if(this.props.Language.languages.some(l => l === lang)){
                Storage.set('language', lang);
                this.props.setCurrentCode(lang);
                this.props.setResKeywords(lang);
            }else{
                setDefault();
            }
        }
    }
    
    _checkValidStates(){
        return (
            this.props.Common.info !== null
            && this.props.Common.artist !== null
            && this.props.Language.languages !== null
            && this.props.Language.refCode !== null
            && this.props.Language.currentCode !== null
            && this.props.Language.divider !== null
            && Object.values(this.props.Language.keywords).every(k => k !== null)
            && this.props.Navigation.pages !== null   
        ) ? true : false;
    }

    _checkStates(props){
        if(this._checkValidStates() === true){
            if(this.props.Reducer.ready === false){
                this.props.set(true);
            }
            if(this.props.Language.ready === false){
                this.props.setLanguagesReady(true);
            }
            if(this.props.Common.ready === false){
                this.props.setCommonReady(true);
            }
            if(this.props.Navigation.ready === false){
                this.props.setNavigationReady(true);
            }
        }else{
            if(this.props.Language.languages === null){
                this.props.setLanguages();
            }
            if(this.props.Language.refCode === null){
                this.props.setRefCode();
            }
            if(this.props.Language.currentCode === null){
                this._setLanguageLang();
            }
            if(this.props.Language.keywords.ref === null){
                this.props.setRefKeywords();
            }
            if(this.props.Language.divider === null){
                this.props.setDivider();
            }
            if(this.props.Common.info === null){
                this.props.setInfo();
            }
            if(this.props.Common.artist === null){
                this.props.setArtist();
            }
            if(this.props.Navigation.pages === null){
                this.props.setNavigationPages();
            }
        }
    }

    componentDidMount(){
        this._checkStates(this.props)
    }

    componentDidUpdate(props){
        if(this._checkValidStates() === true){
            if(this.props.Reducer.ready === false){
                this.props.set(true);
            }
            if(this.props.Language.ready === false){
                this.props.setLanguagesReady(true);
            }
            if(this.props.Common.ready === false){
                this.props.setCommonReady(true);
            }
            if(this.props.Navigation.ready === false){
                this.props.setNavigationReady(true);
            }
        }else{
            // this._checkStates(props);
        }
    }
    
    render(){
        return this.props.Reducer.ready === true
            && this.props.Common.ready === true
            && this.props.Language.ready === true
            && this.props.Navigation.ready === true 
            ? <Element _setLanguageLang={this._setLanguageLang} {...this.props}/> : <Loading />;
    }
}

const states = state => {
    return {
        Reducer: state.AppReducer,
        Language: state.LanguageReducer,
        Common: state.CommonReducer,
        Navigation: state.NavigationReducer
    };
};

const actions = dispatch => {
    return {
        set: (appState = false) => {
            dispatch(SET(appState));
        },
        setLanguagesReady: (s = true) => {
            dispatch(SET_LANGUAGES_READY(s));
        },
        setNavigationDrawer: (drawer) => {
            dispatch(SET_NAVIGATION_DRAWER(drawer));
        },
        setNavigationReady: (s = true) => {
            dispatch(SET_NAVIGATION_READY(s));
        },
        setNavigationPages: () => {
            dispatch(SET_PAGES());
        },
        setNavigationScrolled: (scroll) => {
            dispatch(SET_NAVIGATION_SCROLLED(scroll));
        },
        setLanguages: () => {
            dispatch(SET_LANGUAGES());
        },
        setRefCode: () => {
            dispatch(SET_REF_CODE());
        },
        setCurrentCode: (code = null) => {
            dispatch(SET_CURRENTCODE(code));
        },
        setResKeywords: code => {
            dispatch(SET_RES_KEYWORDS(code));
        },
        unSetResKeywords: () => {
            dispatch(UNSET_RES_KEYWORDS());
        },
        setRefKeywords: () => {
            dispatch(SET_REF_KEYWORDS());
        },
        setDivider: () => {
            dispatch(SET_LANGUAGES_DIVIDER());
        },
        setCommonReady: (ready = false) => {
            dispatch(SET_COMMON_READY(ready));
        },
        setArtist: () => {
            dispatch(SET_ARTIST());
        },
        setInfo: () => {
            dispatch(SET_INFO());
        },
    };
};

export default connect(states, actions)(App);