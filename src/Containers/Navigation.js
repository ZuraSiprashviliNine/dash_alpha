
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../Components/Loading';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import { NavigationBrand, NavigationMenu, Drawer } from '../Components/Navigation';

class Element extends React.Component{
    render(){
        return (
            <nav
                id="navigation"
                className={`animated py-1 ${this.props.Navigation.scrolled === true ? 'scrolled' : ''}`}>
                <Container
                    className="">
                    <Row
                        className="align-items-center">
                        <Col
                            className="brand"
                            lg="2"
                            md="3"
                            xs="6">
                            <NavigationBrand
                                logo={this.props.Common.info.logo}
                                title={this.props.Common.info.navTitle} />
                        </Col>
                        <Col
                            className="menus d-flex flex-row align-items-center justify-content-end">
                            <div className="h-100 d-flex flex-colum justify-content-center">
                                <NavigationMenu 
                                    active={this.props.Navigation.currentPage}
                                    pages={this.props.Navigation.pages}
                                    languages={this.props.Language.languages}
                                    changeLang={this.props.changeLang}
                                    currentLang={this.props.Language.currentCode}
                                    setDrawer={this.props.setDrawer}
                                    drawer={this.props.Navigation.drawer}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Drawer 
                    setDrawer={this.props.setDrawer}
                    drawer={this.props.Navigation.drawer}
                    logo={this.props.Common.info.logo}
                    title={this.props.Common.info.title}
                    active={this.props.Navigation.currentPage}
                    pages={this.props.Navigation.pages}
                    languages={this.props.Language.languages}
                    changeLang={this.props.changeLang}
                    currentLang={this.props.Language.currentCode}/>
            </nav>
        )
    }
}

class Navigation_Component extends React.Component{
    render(){
        return this.props.Navigation.ready === true ? <Element {...this.props}/> : <Loading/>;
    }
}

const states = (state) => {
    return {
        Navigation: state.NavigationReducer,
        Common: state.CommonReducer,
        Language: state.LanguageReducer
    };
};

const actions = (dispatch) => {
    return {

    };
};

export default connect(states, actions)(Navigation_Component);