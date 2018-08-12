
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';
import { getPageSlag } from '../../Helpers/GetPageSlag';
import { SWITCH_PAGE, ADD_PAGE_HISTORY } from '../../Actions/NavigationActions';

import Particles from 'react-particles-js';

import {
    Container,
    Row,
    Col
} from 'reactstrap';
import {SentMessage, AboutImage, AboutContactMeTextBlock, AboutContactMeForm } from '../../Components/AboutContent';

import {SEND_CONTACT_MESSAGE} from '../../Actions/CommonActions';

class Element extends React.Component{
    render(){
        return (
            <div
                id="about_page"
                className="animated page">
                <Particles
                    className={'particles-wrapper'}
                    canvasClassName={'particles-canvas'}
                    />
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
                                                    lg="4"
                                                    xs="12"
                                                    className="p-md-2 p-1">
                                                    <Container>
                                                        <Row>
                                                            <Col
                                                                lg="12"
                                                                sm="6"
                                                                xs="12"
                                                                className="p-1">
                                                                <div
                                                                    className="blockItem p-md-2 p-1">
                                                                    <AboutImage 
                                                                        image={this.props.Common.artist.image}/>
                                                                </div>
                                                                <div className="py-2"/>
                                                                <div
                                                                    className="blockItem p-md-2 p-1">
                                                                    <AboutContactMeTextBlock 
                                                                        title={this.props.Common.info.about.contact.title}
                                                                        text={this.props.Common.info.about.contact.text}/>
                                                                </div>
                                                                <div className="py-2"/>
                                                            </Col>
                                                            <Col
                                                                lg="12"
                                                                sm="6"
                                                                xs="12"
                                                                className="p-1">
                                                                <div
                                                                    className="blockItem p-2">
                                                                    {
                                                                        this.props.Common.contact === true ? (
                                                                            <SentMessage />
                                                                        ) : (
                                                                            <AboutContactMeForm 
                                                                                contact={this.props.Common.contact}
                                                                                send={this.props.sendContactMessage}/>
                                                                        )
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Col>
                                                <Col
                                                    lg="8"
                                                    xs="12"
                                                    className="p-md-2 p-1">
                                                    <div className="blockItem p-2">
                                                        <div 
                                                            dangerouslySetInnerHTML={{__html: this.props.Common.artist.aboutMe}}/>
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
        );
    }
}

class AboutPage extends React.Component{

    componentDidMount(){
        if(this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)){
            this.props.setPage(getPageSlag(this.props.match.path));
        }
    }

    render(){
        return this.props.Common.ready === true ? <Element {...this.props}/> : <Loading/>;
    }
}

const states = (state) => {
    return {
        Navigation: state.NavigationReducer,
        Common: state.CommonReducer
    };
};

const actions = (dispatch) => {
    return {
        setPage: (page) => {
            dispatch(SWITCH_PAGE(page));
            dispatch(ADD_PAGE_HISTORY(page));
        },
        sendContactMessage: (message) => {
            dispatch(SEND_CONTACT_MESSAGE(message));
        }
    };
};

export default connect(states, actions)(AboutPage);