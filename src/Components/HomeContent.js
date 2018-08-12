
import React from 'react';

import Translate from '../Containers/MultiLanguage';

export class HomeContent extends React.Component{
    render(){
        return (
            <div
                className="page-content d-flex flex-column flex-sm-row justify-content-center align-items-center">
                <div
                    className="logo">
                    <img
                        src={this.props.info.logo}
                        alt="logo"/>
                </div>
                <div
                    className="text h1 m-0">
                    <Translate>
                        {this.props.info.title}
                    </Translate>
                </div>
            </div>
        );
    }
}