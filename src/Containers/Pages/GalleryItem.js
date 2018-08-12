
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

import {
    SWITCH_PAGE,
    ADD_PAGE_HISTORY
} from '../../Actions/NavigationActions';

import {
    getPageSlag
} from '../../Helpers/GetPageSlag';
import { UNSET_ITEM_DATA, SET_ITEM_DATA, SET_ITEM_VIEW, SET_ITEM_READY, SET_ITEM_LIKE, UNSET_ITEM_LIKE } from '../../Actions/ItemActions';

import Particles from 'react-particles-js';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import {CatSide, ItemImages, ItemInfo, ItemComments, AddComment} from '../../Components/ItemComponents';
import { SET_GALLERY_USER, SET_GALLERY_USER_LIKE, UNSET_GALLERY_USER_LIKE, SET_GALLERY_USER_VIEW } from '../../Actions/GalleryActions';

class Element extends React.Component{
    constructor(props){
        super(props);

        this.up = this.up.bind(this);
        this._userLike = this._userLike.bind(this);
        this._userUnlike = this._userUnlike.bind(this);
    }

    up(v){
        if(v === true){
            setTimeout(() => {
                this.forceUpdate();
            }, 500);
        }else{
            this.forceUpdate();
        }
    }
    
    _userLike(id){
        this.props.addGalleryUserLikes(id, this.props.Gallery.user.ident);
        this.up();
    }

    _userUnlike(id){
        this.props.removeGalleryUserLikes(id, this.props.Gallery.user.ident);
        this.up();
    }

    componentDidMount(){
        let x = this.props.Gallery.user.views.includes(this.props.Item.data._id);
        if(!x){
            this.props.setItemView(this.props.Item.data._id, this.props.Gallery.user.ident);
        }
    }
    
    render(){
        return (
            <div
                id="item_page"
                className="animated page">
                <Particles
                    className={'particles-wrapper'}
                    canvasClassName={'particles-canvas'}/>
                <div className="page-content py-5">
                    <div className="py-3">
                        <Container>
                            <Row>
                                <Col
                                    xs="12"
                                    className="p-1 my-3 containerCol">
                                    <Container>
                                        <Row>
                                            <Col
                                                lg="9"
                                                className="p-1 dataSide">
                                                <Container
                                                    className="blockItem">
                                                    <Row>
                                                        <Col
                                                            md="7"
                                                            sm="6"
                                                            className="p-1">
                                                            <ItemImages
                                                                up={this.up}
                                                                userLike={this._userLike}
                                                                userUnlike={this._userUnlike}
                                                                userLikes={this.props.Gallery.user.likes}
                                                                images={this.props.Item.data.images}
                                                                image={this.props.Item.data.image}
                                                                title={this.props.Item.data.title}
                                                                id={this.props.Item.data._id}/>
                                                        </Col>
                                                        <Col
                                                            md="5"
                                                            sm="6"
                                                            className="p-1 gallery_content">
                                                            <ItemInfo
                                                                _categories={this.props.Navigation.pages.find(page => page.route === getPageSlag(this.props.match.path)).sub}
                                                                {...this.props.Item.data}/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                                <Container
                                                    className="blockItem my-3">
                                                    <Row
                                                        className="comments">
                                                        <Col
                                                            xs="12">
                                                            <ItemComments 
                                                                id={this.props.Item.data._id}
                                                                comments={this.props.Item.data.comments}/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                                <Container
                                                    className="blockItem">
                                                    <Row>
                                                        <Col
                                                            xs="12">
                                                            <AddComment 
                                                                id={this.props.Item.data._id}
                                                                user={this.props.Gallery.user}/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Col>
                                            <Col
                                                lg="3"
                                                className="p-1 catSide d-none d-sm-none d-md-none d-lg-block">
                                                <CatSide
                                                    actives={this.props.Item.data.categories}
                                                    categories={this.props.Navigation.pages.find(page => page.route === getPageSlag(this.props.match.path)).sub}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

class GalleryItem extends React.Component{
    constructor(props){
        super(props);

        this._checkStates = this._checkStates.bind(this);
        this._checkValidStates = this._checkValidStates.bind(this);
        this._setStates = this._setStates.bind(this);
        this._okStates = this._okStates.bind(this);
    }

    _checkValidStates(){
        return (
            this.props.Item.data !== null
            && this.props.Gallery.user !== null
        ) ? true : false;
    }

    _okStates(props){
        if(props.Item.ready === false){
            this.props.setItemReady();
        }
    }

    _setStates(props){
        if(props.Item.data === null){
            if(this.props.match.params.slag){
                this.props.setItemData(this.props.match.params.slag);
            }
        }
    }

    _checkStates(props){
        if(this._checkValidStates() === true){
            this._okStates(props);
        }else{
            this._setStates(props);
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
            if(this.props.Item.ready === false){
                this.props.setItemReady(true);
            }
        }

        if(this.props.Gallery.user === null){
            this.props.setGalleryUser();
        }else if(this.props.Gallery.user !== null && props.Gallery.user !== null){
            if(this.props.Gallery.user.likes.length !== props.Gallery.user.likes.length){
                this.props.setGalleryUser();
            }
        }
    }

    componentWillUnmount(){
        this.props.unsetItem();
    }
    
    render(){
        return this.props.Item.ready === true ? <Element {...this.props}/> : <Loading/>;
    }
}

const states = (state) => {
    return {
        Navigation: state.NavigationReducer,
        Gallery: state.GalleryReducer,
        Item: state.ItemReducer
    };
};

const actions = (dispatch) => {
    return {
        setPage: (page) => {
            dispatch(SWITCH_PAGE(page));
            dispatch(ADD_PAGE_HISTORY(page));
        },
        setItemReady: (s) => {
            dispatch(SET_ITEM_READY(s));
        },
        unsetItem: () => {
            dispatch(UNSET_ITEM_DATA());
        },
        setItemData: (slag) => {
            dispatch(SET_ITEM_DATA(slag));
        },
        setGalleryUser: () => {
            let _date = new Date();
            let _ident = _date.getTime();
            let _storage = Storage.get('gallery_user');
            let user = {};
            if(_storage !== undefined){
                user = JSON.parse(_storage);
            }else{
                user = {
                    views: [],
                    likes: [],
                    ident: _ident
                };
            }
            Storage.set('gallery_user', JSON.stringify(user));
            dispatch(SET_GALLERY_USER(user));
        },
        addGalleryUserLikes: (id, ident) => {
            let _date = new Date();
            let _ident = ident === undefined ? _date.getTime() : ident;
            let _storage = Storage.get('gallery_user');
            let user = {};
            if(_storage !== undefined){
                user = {
                    ...JSON.parse(_storage),
                    likes: [
                        ...JSON.parse(_storage).likes,
                        id
                    ]
                };
            }else{
                user = {
                    views: [],
                    likes: [id],
                    ident: _ident 
                };
            }
            Storage.set('gallery_user', JSON.stringify(user));
            dispatch(SET_GALLERY_USER_LIKE(id));
            dispatch(SET_ITEM_LIKE(id, ident, true));
        },
        removeGalleryUserLikes: (id, ident) => {
            let _storage = Storage.get('gallery_user');
            let likes = JSON.parse(_storage).likes;
            likes = likes.filter(like => like !== id);
            let _date = new Date();
            let _ident = ident === undefined ? _date.getTime() : ident;
            Storage.set('gallery_user', JSON.stringify(
                {
                    ...JSON.parse(_storage),
                    ident: _ident,
                    likes
                }
            ));
            dispatch(UNSET_GALLERY_USER_LIKE(id));
            dispatch(UNSET_ITEM_LIKE(id, ident, true));
        },
        setItemView: (id, ident) => {
            let _date = new Date();
            let _storage = Storage.get('gallery_user');
            let _ident = ident === undefined ? _date.getTime() : ident;
            let user = {};
            if(_storage !== undefined){
                user = {
                    ...JSON.parse(_storage),
                    views: [
                        ...JSON.parse(_storage).views,
                        id
                    ]
                };
            }else{
                user = {
                    views: [id],
                    likes: [],
                    ident: _ident
                };
            }
            Storage.set('gallery_user', JSON.stringify(user));
            dispatch(SET_GALLERY_USER_VIEW(id));
            dispatch(SET_ITEM_VIEW(id, ident, true));
        }
    };
};

export default connect(states, actions)(GalleryItem);