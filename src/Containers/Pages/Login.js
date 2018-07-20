
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

import {
    Link
} from 'react-router-dom';

class Element extends React.Component{
    constructor(props){
        super(props);


        this._auth = this._auth.bind(this);
    }

    _auth(event){
        event.preventDefault();
    }
    
    render(){
        return (
            <div
                id="login_page"
                className="page animated">
                <div className="container">
                    <div className="row">
                        <div className="col-4 offset-4">
                            <form
                                onSubmit={this._auth}>
                                <input 
                                    type="text"
                                    required
                                    name="user_name"
                                    className="form-control w-100 p-2"
                                    placeholder="Username"/>
                                <input 
                                    type="password"
                                    required
                                    name="password"
                                    className="form-control w-100 p-2"
                                    placeholder="password"/>
                                <Link
                                    to="/forgot"
                                    className="text-capitalize btn-sm btn btn-block w-100 p-2">
                                    forgot password
                                </Link>
                                <input
                                    type="submit"
                                    name="submit_button"
                                    className="form-control btn-sm btn btn-block text-capitalize w-100 p-2"
                                    value="Authenticate"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Login_Page extends React.Component{
    render(){
        return true === true ? <Element {...this.props} /> : <Loading/>;
    }
}

const states = (state) => {
    return {

    };
};
const actions = (dispatch) => {
    return {

    };
};

export default connect(states, actions)(Login_Page);