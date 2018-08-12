
import React from 'react';
import ReactDom from 'react-dom';

import {Provider} from 'react-redux';
import Store from './store';

import App from './Containers/App';

export class Element extends React.Component{
    render(){
        return (
            <Provider
                store={Store}>
                <App {...this.props}/>
            </Provider>
        )
    }
}

ReactDom.render(
    <Element/>,
    document.getElementById('root')
);