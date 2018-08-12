
import React from 'react';
import {connect} from 'react-redux';
import { SWITCH_PAGE, ADD_PAGE_HISTORY } from '../../Actions/NavigationActions';
import { getPageSlag } from '../../Helpers/GetPageSlag';
import { Loading } from '../../Components/Loading';
import { SET_GALLERY_READY, SET_GALLERY_USER_LIKE, SET_GALLERY_PAGE, SET_GALLERY_ITEMS_CURRENT, SET_GALLERY_DATA, SET_GALLERY_INFO, SET_GALLERY_CURRENT_CATEGORY, SET_GALLERY_CATEGORIES, SET_GALLERY_ITEMS_TOTAL, SET_GALLERY_ITEMS_PER_PAGE, SET_GALLERY_USER, UNSET_GALLERY_USER_LIKE, SET_GALLERY_ITEM_LIKES, UNSET_GALLERY_ITEM_LIKES } from '../../Actions/GalleryActions';

import Particles from 'react-particles-js';

import {
    reactLocalStorage as Storage
} from 'reactjs-localstorage';

import {
    Container, Row,
    Col
} from 'reactstrap';
import { GalleryTop, GalleryItems, GalleryPagination } from '../../Components/GalleryComponents';

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

    render(){
        return (
            <div
                id="gallery_page"
                className="page animated">
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
                                                xs="12"
                                                className="p-0 p-md-2">
                                                <GalleryTop
                                                    categories={this.props.Gallery.categories}
                                                    currentCategory={this.props.Gallery.currentCategory}
                                                    title={this.props.Gallery.info.title}
                                                    />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col
                                    xs="12"
                                    className="p-1 my-2 containerCol">
                                    <Container>
                                        <Row>
                                            <Col
                                                xs="12"
                                                className="p-1">
                                                <GalleryItems 
                                                    up={this.up}
                                                    userLike={this._userLike}
                                                    userUnlike={this._userUnlike}
                                                    userLikes={this.props.Gallery.user.likes}
                                                    items={this.props.Gallery.data}
                                                    categories={this.props.Gallery.categories}
                                                    setCurrentCount={this.props.setGalleryItemsCurrent}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col
                                    xs="12"
                                    className="p-1 my-2 containerCol">
                                    <Container>
                                        <Row>
                                            <Col
                                                xs="12">
                                                <GalleryPagination 
                                                    url={this.props.match.url}
                                                    active={this.props.Gallery.page}
                                                    perPage={this.props.Gallery.items.perPage}
                                                    category={this.props.Gallery.currentCategory}
                                                    itemInfo={this.props.Gallery.items}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                                                
                </div>
            </div>
        );
    }
}

class Gallery_Page extends React.Component{
    constructor(props){
        super(props);

        this._checkValidStates = this._checkValidStates.bind(this);
        this._checkStates = this._checkStates.bind(this);

        this._okStates = this._okStates.bind(this);
        this._setStates = this._setStates.bind(this);
    }

    _okStates(props){
        if(props.Gallery.ready === false){
            this.props.setGalleryReady(true);
        }
    }

    _setStates(props){
        if(props.Gallery.info === null){
            this.props.setGalleryInfo();
        }
        if(props.Gallery.categories === null){
            this.props.setGalleryCategories(this.props.Navigation.pages.find(page => page.route === getPageSlag(props.match.url)).sub);
        }
        if(props.Gallery.items.perPage === -1){
            this.props.setGalleryItemsPerPage();
        }
        if(props.match.params){
            if(props.match.params.page && props.match.params.category){
                if(props.match.params.page !== props.Gallery.page || props.match.params.category !== props.Gallery.currentCategory){
                    this.props.setGalleryPage(parseInt(props.match.params.page));
                    this.props.setGalleryData(parseInt(props.match.params.page), props.match.params.category);
                    this.props.setGalleryCurrentCategory(props.match.params.category);
                    this.props.setGalleryItemsTotal({
                        category: props.match.params.category
                    });
                }
            }
        }
    }

    _checkValidStates(){
        return (
            this.props.Gallery.data !== null
            && this.props.Gallery.info !== null
            && this.props.Gallery.categories !== null
            && this.props.Gallery.page !== -1
            && this.props.Gallery.items.total !== -1
            && this.props.Gallery.items.perPage !== -1
            && this.props.Gallery.currentCategory !== null
        ) ? true : false;
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
        if(
            this.props.match.params.page != this.props.Gallery.page || 
            this.props.match.params.category !== this.props.Gallery.currentCategory
        ){
            this.props.setGalleryReady(false);
            this.props.setGalleryPage(-1);
            this.props.setGalleryCurrentCategory(null);
        }else{
            if(this._checkValidStates() === true){
                if(this.props.Gallery.ready === false){
                    this.props.setGalleryReady(true);
                }
            }
        }
        if(this.props.Gallery.page === -1 && props.Gallery.page !== -1 || this.props.Gallery.currentCategory === null && props.Gallery.currentCategory !== null){
            this._setStates(props);
        }
        if(this.props.Gallery.user === null){
            this.props.setGalleryUser();
        }else if(this.props.Gallery.user !== null && props.Gallery.user !== null){
            if(this.props.Gallery.user.likes.length !== props.Gallery.user.likes.length){
                this.props.setGalleryUser();
            }
        }

    }

    render(){
        return this.props.Gallery.ready === true ? <Element {...this.props}/> : <Loading/>;
    }
}

const states = (state) => {
    return {
        Navigation: state.NavigationReducer,
        Gallery: state.GalleryReducer
    };
};

const actions = (dispatch) => {
    return {
        setPage: (page) => {
            dispatch(SWITCH_PAGE(page));
            dispatch(ADD_PAGE_HISTORY(page));
        },
        setGalleryReady: (s = true) => {
            dispatch(SET_GALLERY_READY(s));
        },
        setGalleryPage: (page) => {
            dispatch(SET_GALLERY_PAGE(page));
        },
        setGalleryItemsCurrent: (n) => {
            dispatch(SET_GALLERY_ITEMS_CURRENT(n));
        },
        setGalleryItemsTotal: (pars) => {
            dispatch(SET_GALLERY_ITEMS_TOTAL(pars))
        },
        setGalleryData: (page = null, category = null) => {
            dispatch(SET_GALLERY_DATA(page, category));
        },
        setGalleryInfo: () => {
            dispatch(SET_GALLERY_INFO());
        },
        setGalleryCurrentCategory: (cat = null) =>{
            dispatch(SET_GALLERY_CURRENT_CATEGORY(cat));
        },
        setGalleryCategories: (cats) => {
            dispatch(SET_GALLERY_CATEGORIES(cats));
        },
        setGalleryItemsPerPage: () => {
            dispatch(SET_GALLERY_ITEMS_PER_PAGE());
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
            dispatch(SET_GALLERY_ITEM_LIKES(id, ident, true));
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
            dispatch(UNSET_GALLERY_ITEM_LIKES(id, ident, true));
        }
    };
};

export default connect(states, actions)(Gallery_Page);