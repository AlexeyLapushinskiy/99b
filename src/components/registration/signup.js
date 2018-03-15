import React from 'react';
import { Input, Form } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import { SignUpWrap, SignUpHeader, SignUpContent, SignUpFooter, SignUpFormTitle, LogInButton, LogInButttonWrap } from './style';
import {LogInFooter, LogInFooterLinks, LogInFooterText} from "../logIn/style";
import FBAuth from "../fbAuth/fbAuth";



export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRole: 'Consumer',
      currentProduct: null,
      currentEmail: null,
      currentPassword: null,
      firstName: null,
      lastName: null,
      phone: null,
      storeName: null,
      beverageType: null
    };

    this.toChangeRole = this.toChangeRole.bind(this);
    // this.toAddProduct = this.toAddProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEmailToState = this.setEmailToState.bind(this);
    this.setPasswordToState = this.setPasswordToState.bind(this);
    this.setFirstNameToState = this.setFirstNameToState.bind(this);
    this.setLastNameToState = this.setLastNameToState.bind(this);
    this.setPhoneToState = this.setPhoneToState.bind(this);
    this.setStoreNameToState = this.setStoreNameToState.bind(this);
    this.setBeverageTypeToState = this.setBeverageTypeToState.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    // this.getProducts = this.getProducts.bind(this);
  }

  setEmailToState(e) {
    // console.log(e.target.value);
    this.setState({ currentEmail: e.target.value })
  };

  setPasswordToState(e) {
    // console.log(e.target.value);
    this.setState({ currentPassword: e.target.value })
  };

  setFirstNameToState(e) {
    // console.log(e.target.value);
    this.setState({ firstName: e.target.value })
  };

  setLastNameToState(e) {
    // console.log(e.target.value);
    this.setState({ lastName: e.target.value })
  };

  setPhoneToState(e) {
    // console.log(e.target.value);
    this.setState({ phone: e.target.value })
  };

  setStoreNameToState(e) {
    // console.log(e.target.value);
    this.setState({ storeName: e.target.value })
  };

  setBeverageTypeToState(e) {
    // console.log(e.target.innerText);
    this.setState({ beverageType: e.target.innerText })
  };

  toChangeRole(e) {
    // console.log(e.target.innerText);
    this.setState({ currentRole: e.target.innerText })
  };

  // toAddProduct(e) {
  //   console.log(e.target.innerText);
  //   this.setState({ currentProduct: e.target.innerText })
  // };

  handleSubmit() {
    let email = this.state.currentEmail;
    let password = this.state.currentPassword;
    let role = this.state.currentRole;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let phone = this.state.phone;
    let storeName = this.state.storeName;
    let beverageType = this.state.beverageType;
    const registerURL = 'http://api.99b.co/register';
    const registerBody = {
      "email": email,
      "password": password,
      "role": role,
      "firstName": firstName,
      "lastName": lastName,
      "phone": phone,
      "storeName": storeName,
      "beverageType": beverageType
    };
    // this.getProducts();
    console.log(registerBody)
    this.toSignUp(registerURL, registerBody);
  };

  // getProducts(url) {
  //   axios.get(url)
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  toSignUp(url, body) {
    axios.post(url, body)
    .then(function(res){
      const history = createHistory();
      history.push('/products');
      if(res.data.jwt) {
        console.log(res.data.jwt);
        history.go('/products');
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    let productsDropDown = null;
    let storeName = null;
    const roles = [
      {
        text: 'Consumer',
        value: 'Consumer',
        onClick: this.toChangeRole
      },
      {
        text: 'Producer',
        value: 'Producer',
        onClick: this.toChangeRole
      },
      {
        text: 'Distributor',
        value: 'Distributor',
        onClick: this.toChangeRole
      },
      {
        text: 'Businesses',
        value: 'Businesses',
        onClick: this.toChangeRole
      }
    ];
    const products = [
      {
        value: 'Wine',
        text: 'Wine',
        onClick: this.setBeverageTypeToState
      },
      {
        value: 'Beer',
        text: 'Beer',
        onClick: this.setBeverageTypeToState
      },
      {
        value: 'Liquor',
        text: 'Liquor',
        onClick: this.setBeverageTypeToState
      },
      {
        value: 'Cognac',
        text: 'Cognac',
        onClick: this.setBeverageTypeToState
      },
      {
        value: 'Brandy',
        text: 'Brandy',
        onClick: this.setBeverageTypeToState
      }
    ];

    const emailField =
      <Form.Input placeholder='Email' type='email' onChange={this.setEmailToState} />

    const passwordField =
      <Form.Input placeholder='Password' type='password' onChange={this.setPasswordToState} />;

    const firstNameField =
      <Form.Field control={Input} placeholder='First name' onChange={this.setFirstNameToState} />;


    const lastNameField =
      <Form.Field control={Input} placeholder='Last name' onChange={this.setLastNameToState} />;


    const phone =
      <Form.Field control={Input} placeholder='Phone number' onChange={this.setPhoneToState} />;

    const role =
      <Form.Dropdown selection options={roles} value={this.state.currentRole} />;

    const submitForm =
      <LogInButttonWrap>
        <Form.Button content={'Sign Up'} color='teal' onClick={this.handleSubmit} />
      </LogInButttonWrap>

    if(this.state.currentRole === 'Producer') {
      productsDropDown =
        <Form.Dropdown selection options={products} placeholder='Select products' value={this.state.beverageType} onChange={this.setBeverageTypeToState} />;
    }

    if(this.state.currentRole === 'Producer') {
      storeName =
        <Form.Field control={Input} placeholder='Store Name' onChange={this.setStoreNameToState} />;
    }

    let signUpForm =
        <SignUpContent>
          {emailField}
          {passwordField}
          {firstNameField}
          {lastNameField}
          {phone}
          {role}
          {storeName}
          {productsDropDown}
          <LogInButton>
            {submitForm}
            <Link to="/">{'LogIn'}</Link>
          </LogInButton>
        </SignUpContent>
    ;

    let signUpHeader =
        <SignUpHeader>
          <SignUpFormTitle><div>Sign Up</div></SignUpFormTitle>
        </SignUpHeader>
    ;
    let signUpFooter = (
      <LogInFooter>
        <LogInFooterText>
          <p>Register with:</p>
        </LogInFooterText>
        <LogInFooterLinks>
          <FBAuth role={this.state.currentRole}/>
        </LogInFooterLinks>
      </LogInFooter>
    );


    return (
      <div>
        <SignUpWrap>
          <Form className="login_form">
            {signUpHeader}
            {signUpForm}
            {signUpFooter}
          </Form>
        </SignUpWrap>
      </div>
    );
  }
}