
import React from 'react';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import {
    Link
} from 'react-router-dom';

import Translate from '../Containers/MultiLanguage';
import { getPageSlag } from '../Helpers/GetPageSlag';

import Masonry from 'react-masonry-component';

import ImageZoom from 'react-medium-image-zoom';


export class GalleryTop extends React.Component{

    constructor(props){
        super(props);

        this._getSubs = this._getSubs.bind(this);
    }
    
    _getSubs(){
        let items = this.props.categories.map(category => {
            return (
                <li 
                    key={category.route}
                    className={`mx-1   ${this.props.active === this.props.to ? 'active' : ''} `}>
                    <Link
                        to={category.route}
                        tag="button"
                        className={`theme_button d-block my-1 my-md-0 ${category.slag === this.props.currentCategory ? 'theme_button-active': ''}`}>
                        <Translate>
                            {category.title}
                        </Translate>
                    </Link>
                </li>
            );
        });

        return items;
    }
    
    render(){
        return (
            <Container className="gallery_top">
                <Row
                    className="align-items-center">
                    <Col
                        lg="4"
                        className="p-1">
                        <h1
                            className="m-0 text-capitalize gallery_top_title">
                            <Translate>
                                {this.props.title}
                            </Translate>
                        </h1>
                    </Col>
                    <Col
                        lg="8"
                        className="p-1">
                        <ul
                            className="list-unstyled m-0 d-md-flex flex-row align-items-center justify-content-lg-end">
                            {this._getSubs()}
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export class GalleryImage extends React.Component{
    render(){
        return (
            <ImageZoom
                image={{
                    src: this.props.img,
                    alt: this.props.title,
                    className: 'img w-100 gallery_item-image_img',
                }}
                zoomImage={{
                    src: this.props.img,
                    alt: this.props.title,
                }}
            />
        )
    }
}

class Dropper extends React.Component{
    render(){
        return (
            <div
                onClick={this.props.setDropper}
                className={`dropper d-flex flex-row align-items-center justify-content-center ${this.props.status === true ? 'active' : ''}`}>
                <div className="theme_button m-0">
                    <span className={`fa fa-angle-${this.props.status === true ? 'up': 'down'}`}/>
                </div>
            </div>
        )
    }
}

export class Like extends React.Component{
    constructor(props){
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(){
        if(!this.props.userLikes.find(like => like === this.props.id)){
            this.props.userLike(this.props.id);
        }else{
            this.props.userUnlike(this.props.id);
        }
    }
    
    render(){
        return (
            <button
                onClick={this._handleClick}
                className={`liker theme_button ${this.props.userLikes.find(like => like === this.props.id) ? 'theme_button-active': 'theme_button-inverse'}`}>
                <span className="fa fa-heart"/>
            </button>
        )
    }
}

export class GalleryItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dropper: false
        };
        
        this._getCategories = this._getCategories.bind(this);
        this._setDropperState = this._setDropperState.bind(this);
    }

    _getCategories(){
        let categories = this.props._categories.filter(cat => this.props.categories.includes(cat.slag));
        return categories.map(category => {
            return (
                <Col
                    sm="6"
                    key={category.slag}
                    className="p-1">
                    <Link
                        to={`/gallery/page/0/category/${category.slag}`}
                        tag="button"
                        className="theme_button text-center btn-block">
                        <Translate>
                            {category.title}
                        </Translate>
                    </Link>         
                </Col>
            )
        });
    }

    _setDropperState(){
        this.props.up(this.state.dropper);
        this.setState({
            ...this.state,
            dropper: !this.state.dropper
        });

    }
    
    render(){
        return (
            <div
                className="gallery_item-container">
                <div className="p-1 blockItem">
                    <div className="image">
                        <GalleryImage 
                            title={this.props.title}
                            img={this.props.image}/>

                        <Dropper 
                            status={this.state.dropper}
                            setDropper={this._setDropperState}/>
                        <Like 
                            id={this.props._id}
                            userUnlike={this.props.userUnlike}
                            userLikes={this.props.userLikes}
                            userLike={this.props.userLike}/>
                    </div>
                    <div className={`gallery_item_content_container ${this.state.dropper === true ? 'active': ''}`}>
                        <div className="title border-bottom text-capitalize px-2 py-3 h3 m-0">
                            <Link
                                to={`/gallery/item/${this.props.slag}`}
                                tag="a"
                                className="d-block">
                                <Translate>
                                    {this.props.title}
                                </Translate>
                            </Link>
                        </div>
                        <ul className=" m-0 metas border-bottom list-unstyled px-1 py-2 d-flex flex-row align-items-center justify-content-md-end justify-content-start">
                            <li className="p-1 small d-flex flex-row align-items-center">
                                <span className="fa fa-calendar" />
                                <span className="ml-1">
                                    {this.props.created_at}
                                </span>
                            </li>
                            <li className="p-1 small d-flex flex-row align-items-center">
                                <span className="fa fa-eye" />
                                <span className="ml-1">
                                    <span>
                                        {this.props.views} 
                                    </span>
                                    &nbsp;
                                    <Translate>
                                        views
                                    </Translate>
                                </span>
                            </li>
                        </ul>
                        {
                            this.props.short_description ? (
                                <div className="p-md-2 p-1 border-bottom small description">
                                    <Translate>
                                        {this.props.short_description}
                                    </Translate>
                                </div>
                            ) : null
                        }{
                            this.props.categories.length !== 0 ? (
                                <Container className="border-bottom categories">
                                    <Row>
                                        {this._getCategories()}
                                    </Row>
                                </Container>
                            ) : null
                        }
                        <div className="mores pt-1">
                            <Container
                                className="">
                                <Row className="align-items-center">
                                    <Col
                                        xl="8"
                                        md="12"
                                        sm="8"
                                        xs="12"
                                        className="p-0">
                                        <Container>
                                            <Row>
                                                <Col
                                                    xs="6"
                                                    className="px-1 py-2">
                                                    <div
                                                        className="border-0 py-2 btn-sm btn-block d-flex flex-row align-items-center theme_button">
                                                        <span className="fa fa-comment"/>
                                                        <span className="ml-1">
                                                            {this.props.comments}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col
                                                    xs="6"
                                                    className="px-1 py-2">
                                                    <div
                                                        className="border-0 py-2 btn-sm btn-block d-flex flex-row align-items-center theme_button">
                                                        <span className="fa fa-thumbs-up"/>
                                                        <span className="ml-1">
                                                            {this.props.likes}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                    <Col
                                        xl="4"
                                        md="12"
                                        sm="4"
                                        xs="12"
                                        className="p-0 ">
                                        <Link
                                            tag="button"
                                            to={`/gallery/item/${this.props.slag}`}
                                            className="border-0 py-2 btn-sm btn-block theme_button">
                                            <span className="ml-1 text-capitalize">
                                                <Translate>
                                                    read more
                                                </Translate>
                                            </span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export class GalleryItems extends React.Component{
    constructor(props){
        super(props);

        this.getDataItems = this.getDataItems.bind(this);
    }

    componentDidMount(){
        this.props.setCurrentCount(this.props.items.length);
    }

    componentDidUpdate(props){
        if(props.items.length !== this.props.items.length){
            this.props.setCurrentCount(props.items.length);
        }
    }

    getDataItems(){
        return this.props.items.map(item => {
            return (
                <GalleryItem
                    key={item._id}
                    userLike={this.props.userLike}
                    userUnlike={this.props.userUnlike}
                    userLikes={this.props.userLikes}
                    up={this.props.up}
                    _categories={this.props.categories}
                    {...item}/>
            )
        })
    }
    
    render(){
        return (
            <Container className="gallery_content">
                <Row>
                    <Col
                        xs="12"
                        className="p-0">
                        <Masonry
                            ref={element => {
                                this.masonry = element
                            }}
                            className={'my-gallery-class m-0 list-unstyled'}
                            elementType={'div'}
                            options={{transitionDuration: 100}}
                            disableImagesLoaded={false} 
                            updateOnEachImageLoad={true}
                            imagesLoadedOptions={{ background: '.my-bg-image-el' }}>
                        {this.getDataItems()}
                        </Masonry>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export class GalleryPagination extends React.Component{
    constructor(props){
        super(props);

        this.getPages = this.getPages.bind(this);
    }

    getPages(){
        let pages = [];
        for(let i = 0; i < this.props.itemInfo.total / this.props.perPage; i++){
            pages.push((
                <Link
                    to={`${getPageSlag(this.props.url)}/page/${i}/category/${this.props.category}`}
                    tag={'button'}
                    key={i}
                    className={`theme_button d-inline-block m-2 px-2 py-1 ${i === this.props.active ? 'theme_button-active':''}`}>
                    {i + 1}
                </Link>
            ));
        }

        return pages;
    }
    
    render(){
        return (
            <Container className="gallery_pagination">
                <Row>
                    <Col
                        xs="12"
                        className="py-2 px-0">
                        {this.getPages()}
                    </Col>
                </Row>
            </Container>
        )
    }
}