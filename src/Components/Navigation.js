
import React from 'react';

import {
    Link
} from 'react-router-dom';

import Translate from '../Containers/MultiLanguage';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import {Scrollbars} from 'react-custom-scrollbars';

export class NavigationBrand extends React.Component{
    render(){
        return (
            <Link
                className="d-flex brand_link flex-row align-items-center"
                to="/">
                <img
                    className="logo"
                    src={this.props.logo}/>
                {this.props.title !== undefined? (
                    <div className="text h2 m-0 text-uppercase">
                        <Translate>
                            {this.props.title}
                        </Translate>
                    </div>
                ): null}
            </Link>
        )
    }
}

class SimpleNavigationMenuItem extends React.Component{
    render(){
        return (
            <li
                className={`not-subable ${this.props.active === this.props.to ? 'active' : ''}  ${this.props.className || null}`}>
                <Link
                    to={this.props.to}
                    tag="button"
                    onClick={() => {
                        if(this.props.drawerAction){
                            this.props.setDrawer();
                        }
                    }}
                    className={`theme_button ${this.props.active === this.props.to ? 'theme_button-active' : ''} ${this.props.inverse === true ? 'theme_button-inverse': ''}`}>
                    <Translate>
                        {this.props.title}
                    </Translate>
                </Link>
            </li>
        );
    }
}

class SubAbleNavigationMenuItem extends React.Component{
    constructor(props){
        super(props);

        this._getSubMenuItems = this._getSubMenuItems.bind(this);
    }

    _getSubMenuItems(){
        let items = this.props.sub.map(s => 
            <SimpleNavigationMenuItem
               key={s.route}
               to={s.route}
               drawerAction={this.props.drawerAction}
               setDrawer={this.props.setDrawer}
               inverse={true}
               title={s.title}/>);

        return items;
    }

    render(){
        return (
            <li
                className={`mx-1 subable  ${this.props.active === this.props.to ? 'active' : ''} `}>
                <Link
                    to={this.props.to}
                    tag="button"
                    onClick={() => {
                        if(this.props.drawerAction){
                            this.props.setDrawer();
                        }
                    }}
                    className={`theme_button ${this.props.active === this.props.to ? 'theme_button-active': ''}`}>
                    <Translate>
                        {this.props.title}
                    </Translate>
                    <div className="tri"/>
                </Link>
                <div className="sub-menu-container">
                    <ul
                        className="sub-menu m-0 p-1 list-unstyled">
                        {this._getSubMenuItems()}
                    </ul>
                </div>
            </li>
        )
    }
}

class LanguagesNavigationMenuItem extends React.Component{
    constructor(props){
        super(props);

        this._getLanguageMenuItems = this._getLanguageMenuItems.bind(this);
    }

    _getLanguageMenuItems(){
        let items = this.props.languages.map(lang => 
            <li
                key={lang}
                className={`not-subable ${this.props.active === this.props.to ? 'active' : ''}  ${this.props.className || null}`}>
                <button
                    onClick={() => {
                        if(this.props.drawerAction){
                            this.props.setDrawer();
                        }
                        this.props.changeLang(lang)
                    }}
                    className={`theme_button-inverse theme_button ${this.props.currentLang === lang ? 'theme_button-active': ''}`}>
                    {lang}
                </button>
            </li>);

        return items;
    }
    render(){
        return (
            <li
                className="mx-1 subable">
                <button
                    className={`theme_button`}>
                    <Translate>
                        {this.props.currentLang}
                    </Translate>
                    <div className="tri"/>
                </button>
                <div className="sub-menu-container">
                    <ul
                        className="sub-menu m-0 p-1 list-unstyled">
                        {this._getLanguageMenuItems()}
                    </ul>
                </div>
            </li>
        )
    }
}

class NavigationMenuItemGenerator extends React.Component{
    render(){
        let items = this.props.items.map(item => 
            item.sub ? 
                <SubAbleNavigationMenuItem
                    key={item.route}
                    className="mx-1"
                    active={this.props.active}
                    to={item.route}
                    title={item.title}
                    sub={item.sub}/> : 
                 <SimpleNavigationMenuItem
                    key={item.route}
                    className="mx-1"
                    active={this.props.active}
                    to={item.route}
                    title={item.title}/>
        );
        items.push(
            <LanguagesNavigationMenuItem 
                key="languages"
                languages={this.props.languages}
                changeLang={this.props.changeLang}
                currentLang={this.props.currentLang}/>
        );
        return items;
    }
}

class DrawerToggler extends React.Component{
    constructor(props){
        super(props);

        this._setDrawer = this._setDrawer.bind(this);
    }

    _setDrawer(){
        this.props.setDrawer(!this.props.drawer);
    }
    
    render(){
        return (
            <li
                className="not-subable">
                <button
                    onClick={this._setDrawer}
                    className={`theme_button-inverse theme_button`}>
                    <div className="fa fa-bars"/>
                </button>
            </li>
        )
    }
}

export class NavigationMenu extends React.Component{
    render(){
        return [
            <ul
                key="default"
                className="d-none d-md-flex m-0 flex-row align-items-center list-unstyled">
                <NavigationMenuItemGenerator
                    active={this.props.active}
                    items={this.props.pages}
                    languages={this.props.languages}
                    changeLang={this.props.changeLang}
                    currentLang={this.props.currentLang}/>
            </ul>,
            <ul
                key="toggler"
                className="d-flex m-0 d-md-none flex-row align-items-center list-unstyled">
                <DrawerToggler setDrawer={this.props.setDrawer} drawer={this.props.drawer}/>
            </ul>
        ]
    }
}

export class Drawer extends React.Component{
    constructor(props){
        super(props);

        this._getDrawerItems = this._getDrawerItems.bind(this);
        this._setDrawer = this._setDrawer.bind(this);
    }

    _setDrawer(){
        this.props.setDrawer(!this.props.drawer);
    }
    
    _getDrawerItems(){
        let items = this.props.pages.map(page => {
            return page.sub ? <SubAbleNavigationMenuItem
                key={page.route}
                active={this.props.active}
                to={page.route}
                title={page.title}
                sub={page.sub}
                drawerAction={true}
                setDrawer={this._setDrawer}/> :
                <SimpleNavigationMenuItem
                    key={page.route}
                    active={this.props.active}
                    to={page.route}
                    drawerAction={true}
                    setDrawer={this._setDrawer}
                    title={page.title}/>
        });
        items.push(
            <LanguagesNavigationMenuItem 
                key="languages"
                languages={this.props.languages}
                changeLang={this.props.changeLang}
                currentLang={this.props.currentLang}
                drawerAction={true}
                setDrawer={this._setDrawer}/>
            );

        return items;
    }

    render(){
        return (
            <div
                className={`animated d-md-none ${this.props.drawer === true ? 'active': 'not_active'}`}
                id="drawer">
                <Container className="h-100">
                    <Row className="firstRow">
                        <Col
                            xs="12"
                            className="py-2">
                            <div className="drawer-title brand d-flex flex-row align-items-center justify-content-between">
                                <div className="px-1">
                                    <NavigationBrand
                                        logo={this.props.logo}/>
                                </div>
                                <div className="ml-2">
                                    <button
                                        onClick={this._setDrawer}
                                        className="theme_button theme_button-inverse">
                                        <span className="fa fa-times"/>
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="flex-fill h-100">
                        <Col
                            xs="12"
                            className="px-1 py-2 flex-fill">
                            <Scrollbars
                                renderThumbVertical={() => {
                                    return (
                                        <div
                                            className={'track-vertical'} style={{
                                            backgroundColor: 'rgba(255,255,255, 4)'
                                        }}/>
                                    );
                                }}>
                                <ul
                                    className="list-unstyled draw_menu d-flex flex-column justify-content-start">
                                    {this._getDrawerItems()}
                                </ul>
                            </Scrollbars>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}