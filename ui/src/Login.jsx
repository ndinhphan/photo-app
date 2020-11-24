import React, { Component } from "react";
// import Switch from "react-bootstrap/esm/Switch";
// import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {        
        localStorage.setItem(AUTH_TOKEN, authtoken);
        alert(AUTH_TOKEN);
        // TODO: auth user and redirect to Home
    }

    // _confirm = async data => {
    //     const { token } = this.state.login ? data.login : data.signup
    //     this._saveUserData(token)
    //     this.props.history.push(`/`)
    //   }
    
    // _saveUserData = token => {
    //     localStorage.setItem(AUTH_TOKEN, token)
    // }


    render() {
        if (this.state.isLoggedIn) return (<Switch><Redirect from='/login' to='/home' /></Switch>)
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