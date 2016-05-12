import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router'

import fetch from 'isomorphic-fetch';

/**
 * The login component handles login and logout of a donor.
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since March 2016
 */
class Login extends React.Component {

    constructor() {
        super();

        this.logout = this.logout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    logout() {
        if (this.props.donor != undefined && this.props.donor != null) {
            this.props.logout(this.props.donor.token);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const login = ReactDOM.findDOMNode(this.refs.login).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

        // send login request to back end
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            contentType: "application/json",
            dataType: 'json',
            body: JSON.stringify({login: login, password: password})
        }).then(() => {
            this.context.router.push('/');
        })
    }

    render() {
        if (this.props.donor != undefined && this.props.donor != null)
            return (
                <div>
                    <p>
                        You are logged in as {this.props.donor.firstName} {this.props.donor.lastName}
                    </p>
                    <button onClick={this.logout}>Logout</button>
                </div>
            );
        else
            return (
                <div style={{width: '500px'}}>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Please Login</h2>
                        Login: <input type="text" ref="login"/>
                        <br/>
                        Password: <input type="password" ref="password"/>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
    }
}
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;
