import React, { Component } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Redirect } from "react-router-dom";
import bcrypt from 'bcryptjs';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(result => { // TODO 
            console.log(result);
            // this.setState({isLoggedIn: true})
            // localStorage.setItem('AUTH_TOKEN', 'authed');
            // console.log(localStorage.getItem('AUTH_TOKEN'));
            sessionStorage.setItem('AUTH_TOKEN', 'authed');
            console.log(sessionStorage.getItem('AUTH_TOKEN'));
        })
    }


    render() {
        if (localStorage.getItem('AUTH_TOKEN')) return (<Switch><Redirect from='/login' to='/home' /></Switch>)
        else return (
            <form onSubmit={this.handleSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" required
                        value={this.state.email} onChange={this.handleEmailChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" required
                        value={this.state.password} onChange={this.handlePasswordChange}
                    />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    <a href="#">Forgot password?</a>
                </p>
                <hr />
                <div className="text-center">
                    Don't have an account? <a href="/register">Register</a>
                </div>
            </form>

        );
    }
}

export default Login;