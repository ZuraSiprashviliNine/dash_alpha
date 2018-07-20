
import React from 'react';

export class Loading extends React.Component{
    render(){
        return (
            <div
                id="loading_page"
                className="loading d-flex flex-column page justify-content-center align-items-center m-0 h1 animated fadeIn">
                <div className="jacker animated">
                    <span className="fa fa-spinner"/>
                </div>
            </div>
        )
    }
}