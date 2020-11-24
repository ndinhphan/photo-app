import React, { Component } from "react";
import graphQLFetch from './graphQLFetch'
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '2323e',
            password: 'wefwefew',
            firstname: 'adsadsd',
            lastname: 'asdsads'
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
        console.log('handlesubmit');
        const {firstname, lastname, password, email} = this.state;
        const vars = {
            firstname, lastname, password, email
        };

        const query = `mutation userCreate(
            $firstname: String!
            $lastname: String!
            $email: String!
            $password: String!

        ){
            userCreate(user:{
              firstname: $firstname,
              lastname: $lastname,
              email:$email,
              password:$password,
            })
              {
              id, firstname, lastname, email
            }
          }`
        const data = await graphQLFetch(query, vars);
        if (data) console.log(data.userCreate);
        
        // localStorage.setItem(AUTH_TOKEN, authtoken);
        // alert(AUTH_TOKEN);
        // // TODO: auth user and redirect to Home
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" required />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" required />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <hr />
                <p className="text-center">
                    Already registered? <a href="/login">Log in</a>
                </p>
            </form>
        );
    }


}