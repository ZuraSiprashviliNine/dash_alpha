
import React from 'react';

import {
    Card,
    CardTitle,
    CardText,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col
} from 'reactstrap';

import Translate from '../Containers/MultiLanguage';

export class AboutImage extends React.Component{
    render(){
        return (
            <img src={this.props.image} className="w-100"/>
        )
    }
}

export class AboutContactMeTextBlock extends React.Component{
    render(){
        return (
            <Card 
                className="bg-transparent aboutContactMeTextBlock">
                <CardBody className="p-md-3 p-1">
                    <CardTitle
                        className="text-capitalize h2 px-2 pb-2 m-0">
                        <Translate>
                            {this.props.title}
                        </Translate>
                    </CardTitle>
                    <CardText
                        className="small px-1 py-2">
                        <Translate>
                            {this.props.text}
                        </Translate>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export class AboutContactMeForm extends React.Component{
    constructor(props){
        super(props);

        this._send = this._send.bind(this);

        this._getError = this._getError.bind(this);
    }

    _send(event){
        event.preventDefault();
        this.props.send({
            user_name: event.target['user_name'].value,
            subject: event.target['contact_subject'].value,
            email: event.target['contact_email'].value,
            message: event.target['contact_message'].value
        });
    }

    _getError(name){
        if(this.props.contact !== null){
            if(this.props.contact[name] !== undefined){
                if(this.props.contact[name].length !== 0){
                    return (
                        <div className="blockItem blockItem-inverse small m-2 p-1 text-right">
                            {this.props.contact[name].map((i, index) => (
                                <div key={index} className="text-capitalize p-1 my-1 blockItem">
                                    <b className="mr-1">
                                        <Translate>
                                            {name.replace(/_/g, ' ')}
                                        </Translate>
                                    </b>
                                    <Translate>
                                        {i}
                                    </Translate>
                                </div>
                            ))}
                        </div>
                    )
                }
            }
        }
    }
    
    render(){
        return (
            <Form
                onSubmit={this._send}
                className="aboutContactMeForm p-2">
                <FormGroup>
                    <Label for="user_name" className="small text-capitalize">
                        <Translate>
                            your name
                        </Translate>
                    </Label>
                    <Input type="text" name="user_name" id="user_name" placeholder="John Doe" />
                    {this._getError('user_name')}
                </FormGroup>
                <FormGroup>
                    <Label for="contact_email" className="small text-capitalize">
                        <Translate>
                            email
                        </Translate>
                    </Label>
                    <Input type="text" name="contact_email" id="contact_email" placeholder="example@gmail.com" />
                    {this._getError('email')}
                </FormGroup>
                <FormGroup>
                    <Label for="contact_subject" className="small text-capitalize">
                        <Translate>
                            subject
                        </Translate>
                    </Label>
                    <Input type="text" name="contact_subject" id="contact_subject" placeholder="" />
                    {this._getError('subject')}
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword" className="small text-capitalize">
                        <Translate>
                            message
                        </Translate>
                    </Label>
                    <Input
                        type="textarea"
                        name="contact_message"
                        id="contact_message"
                        placeholder="Message..."/>
                    {this._getError('message')}
                </FormGroup>
                <FormGroup>
                    <Container>
                        <Row>
                            <Col
                                xs="6"
                                className="p-1">
                                <button
                                    type="reset"
                                    className="form-control">
                                    <Translate>
                                        reset
                                    </Translate>
                                </button>
                            </Col>
                            <Col
                                xs="6"
                                className="p-1">
                                <button
                                    type="submit"
                                    className="form-control">
                                    <Translate>
                                        send
                                    </Translate>
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </FormGroup>
            </Form>
        )
    }
}

export class SentMessage extends React.Component{
    render(){
        return (
            <div className="text-center sent_message p-1 h1 m-0">
                <Translate>
                    your message was sent
                </Translate>
            </div>
        )
    }
}