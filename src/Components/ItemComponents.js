
import React from 'react';

import {
    Link
} from 'react-router-dom';

import Translate from '../Containers/MultiLanguage';
import { Like, GalleryImage } from './GalleryComponents';

import Swiper from 'react-id-swiper';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

export class CatSide extends React.Component{
    constructor(props){
        super(props);

        this._getCats = this._getCats.bind(this);
    }

    _getCats(){
        return this.props.categories.map(cat => {
            return (
                <div className="m-1" key={cat.route}>
                    <Link
                        to={cat.route}
                        tag="button"
                        className={`theme_button btn-block ${this.props.actives.includes(cat.slag) ? 'theme_button-active' : ''}`}>
                        <Translate>
                            {cat.title}
                        </Translate>
                    </Link>
                </div>
            )
        })
    }
    
    render(){
        return (
            <div
                className="blockItem">
                {this._getCats()}
            </div>
        )
    }
}

export class ItemImages extends React.Component{
    constructor(props){
        super(props);

        this._getContent = this._getContent.bind(this);
        this._getItems = this._getItems.bind(this);
    }

    _getItems(){
        let items = this.props.images.map(image => {
            return (
                <div
                    key={image}>
                    <GalleryImage
                        img={image}
                        title={this.props.title}/>
                </div>
            )
        });
        items.unshift((
            <div key="first">
                <GalleryImage
                    img={this.props.image}
                    title={this.props.image}/>
            </div>
        ));
        return items;
    }

    _getContent(){
        if(this.props.images.length === 0){
            return (
                <div
                    className="image">
                    <GalleryImage
                        title={this.props.title}
                        img={this.props.image}/>
                </div>
            );
        }else{
            return (
                <Swiper {...{
                        autoHeight: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                            dynamicBullets: true
                        }
                    }}>
                    {this._getItems()}
                </Swiper>
            )
        }
    }
    
    render(){
        return (
            <div
                className="h-100 p-1 item_images_cont">
                <div className="blockItem p-1">
                    <Like
                        id={this.props.id}
                        userLikes={this.props.userLikes}
                        userLike={this.props.userLike}
                        userUnlike={this.props.userUnlike}/>
                    {this._getContent()}
                </div>
            </div>
        )
    }
}

export class ItemInfo extends React.Component{
    constructor(props){
        super(props);

        this._getCategories = this._getCategories.bind(this);
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
    
    render(){
        return (
            <div className="gallery_item_content_container d-flex flex-column justify-content-between h-100 active">
                <div>
                    <div className="title border-bottom text-capitalize px-2 py-3 h3 m-0">
                        <Translate>
                            {this.props.title}
                        </Translate>
                    </div>
                    {
                        this.props.full_description ? (
                            <div className="p-md-2 p-1 border-bottom small description">
                                <Translate>
                                    {this.props.full_description}
                                </Translate>
                            </div>
                        ) : null
                    }
                </div>
                <div>

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
                                    {this.props.views.length} 
                                </span>
                                &nbsp;
                                <Translate>
                                    views
                                </Translate>
                            </span>
                        </li>
                    </ul>
                    {
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
                                                        {this.props.comments.length}
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
                                                        {this.props.likes.length}
                                                    </span>
                                                </div>
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

class NoComments extends React.Component{
    render(){
        return (
            <div className="no_comments h3 m-0 p-1">
                <Translate>
                    no comments here, be first !
                </Translate>
            </div>
        )
    }
}

export class AddComment extends React.Component{
    render(){
        return ( 
            <div>
                add comment
            </div>
        )
    }
}

class Comments extends React.Component{
    render(){
        return (
            <div
                key="comments_items">
                comments
            </div>
        )
    }
}

export class ItemComments extends React.Component{
    render(){
        return this.props.comments.length === 0 ? <NoComments /> : <Comments {...this.props}/>;
    }
}