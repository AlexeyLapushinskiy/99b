import React from 'react';
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import {
  LogInWrap, LogInHeader, LogInContent, LogInFooter, LogInFooterText, LogInFooterLinks,
  LogInFormTitle, LogInButton, LogInButttonWrap, LoginLinksWrap
} from './style';
import FBAuth from "../fbAuth/fbAuth";


export default class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEmail: null,
      currentPassword: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEmailToState = this.setEmailToState.bind(this);
    this.setPasswordToState = this.setPasswordToState.bind(this);
    this.toLogIn = this.toLogIn.bind(this);
    this.getUrlVars = this.getUrlVars.bind(this);
    this.sentUrlVars = this.sentUrlVars.bind(this);
  }

  setEmailToState(e) {
    this.setState({ currentEmail: e.target.value })
  };

  setPasswordToState(e) {
    this.setState({ currentPassword: e.target.value })
  };

  handleSubmit() {
    const email = this.state.currentEmail;
    const password = this.state.currentPassword;
    const loginURL = 'http://api.99b.co/authenticate';
    const loginBody = {
      "email": email,
      "password": password,
    };
    this.toLogIn(loginURL, loginBody);
  };

  sentUrlVars(id, page) {
    const url = `http://api.99b.co/email/confirm?userIdentificator=${id}&VERIFICATION_KEY=${page}`;
    axios.get(url)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  toLogIn(url, body) {
    axios.post(url, body)
    .then((res) => {
      console.log(res);
      const history = createHistory();
      history.push('/products');
      if(res.data.jwt) {
        console.log(res.data.jwt);
        this.props.UserInfo(res.data.currentUser);
        history.go('/products');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };




  getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

  render() {

    let id = this.getUrlVars()["userIdentificator"];
    let page = this.getUrlVars()["VERIFICATION_KEY"];
    if(id && page) {
      this.sentUrlVars(id, page);
    };

    const emailField =
      <Form.Input placeholder='Email' type='email' onChange={this.setEmailToState} />

    const passwordField =
      <Form.Input placeholder='Password' type='password' onChange={this.setPasswordToState} />;

    const submitForm =
      <LogInButttonWrap>
        <Form.Button content={'Log In'} color='teal' onClick={this.handleSubmit} />
      </LogInButttonWrap>

    let loginForm =
        <LogInContent>
          {emailField}
          {passwordField}
          <LogInButton>
            {submitForm}
            <LoginLinksWrap>
              <Link to="/signup">Registration</Link>
              <br/>
              <Link to="/resetPass">Reset Password</Link>
            </LoginLinksWrap>
          </LogInButton>
        </LogInContent>
      ;

    let loginHeader =
        <LogInHeader>
          <LogInFormTitle><div>Log In</div></LogInFormTitle>
        </LogInHeader>
      ;

    let loginFooter =
        <LogInFooter>
          <LogInFooterText>
            <p>Log In with:</p>
          </LogInFooterText>
          <LogInFooterLinks>
            <FBAuth />
          </LogInFooterLinks>
        </LogInFooter>
      ;


    return (
      <div>
        <LogInWrap>
          <Form className="login_form">
            {loginHeader}
            {loginForm}
            {loginFooter}
          </Form>
        </LogInWrap>
      </div>
    );
  }
}