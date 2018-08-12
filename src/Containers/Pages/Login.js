
import React from 'react';
import {connect} from 'react-redux';
import { Loading } from '../../Components/Loading';

import {
    Link
} from 'react-router-dom';
import { SWITCH_PAGE, ADD_PAGE_HISTORY } from '../../Actions/NavigationActions';

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

    componentDidMount(){
        this.props.setPage(this.props.match.path);
    }
    
    render(){
        if(this.props.User.user){
            return <Redirect to="/admin"/>
        }else{
            return this.props.App.ready === true ? <Element {...this.props} /> : <Loading/>;
        }
    }
}

const states = (state) => {
    return {
        App: state.AppReducer,
        User: state.UserReducer,
        Navigation: state.NavigationReducer
    };
};
const actions = (dispatch) => {
    return {
        setPage: (page) => {
            dispatch(SWITCH_PAGE(page));
            dispatch(ADD_PAGE_HISTORY(page));
        }
    };
};

export default connect(states, actions)(Login_Page);