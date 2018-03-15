import React from 'react';
import {Form} from 'semantic-ui-react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import {Wrap, Header, Content, Title, ChangePassButton, ChangePassButtonWrap, LinksWrap} from './style';

export default class ResetPass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEmail: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEmailToState = this.setEmailToState.bind(this);
    this.resetPass = this.resetPass.bind(this);
    // this.getUrlVars = this.getUrlVars.bind(this);
    // this.sentUrlVars = this.sentUrlVars.bind(this);
  }

  setEmailToState(e) {
    this.setState({currentEmail: e.target.value})
  };

  handleSubmit() {
    const email = this.state.currentEmail;
    const url = 'http://api.99b.co/password/restore';
    const body = {
      "email": email
    };
    this.resetPass(url, body);
  };

  // sentUrlVars(id, page) {
  //   const url = `http://api.99b.co/email/confirm?userIdentificator=${id}&VERIFICATION_KEY=${page}`;
  //   axios.get(url)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  resetPass(url, body) {
    console.log(body);
    axios.post(url, body)
      .then((res) => {
        console.dir(res);
        console.log(res.data.jwt);
        if (res.data.jwt) {
          const history = createHistory();
          history.push('/products');
          this.props.UserInfo(res.data.currentUser);
          history.go('/products');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // getUrlVars() {
  //   let vars = {};
  //   let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
  //     vars[key] = value;
  //   });
  //   return vars;
  // }

  render() {

    // let id = this.getUrlVars()["userIdentificator"];
    // let page = this.getUrlVars()["VERIFICATION_KEY"];
    // if (id && page) {
    //   this.sentUrlVars(id, page);
    // }

    const emailField =
      <Form.Input placeholder='Email' type='email' onChange={this.setEmailToState} autoComplete="off"/>;

    const submitForm = (
      <ChangePassButtonWrap>
        <Form.Button content={'Reset'} color='teal' onClick={this.handleSubmit}/>
      </ChangePassButtonWrap>
    );

    let loginForm =
      <Content>
        {emailField}
        <ChangePassButton>
          {submitForm}
          <LinksWrap>
            <Link to="/">Back to Login</Link>
          </LinksWrap>
        </ChangePassButton>
      </Content>
    ;

    let loginHeader =
      <Header>
        <Title>
          <div>Reset password</div>
        </Title>
      </Header>
    ;

    return (
      <div>
        <Wrap>
          <Form className="login_form">
            {loginHeader}
            {loginForm}
          </Form>
        </Wrap>
      </div>
    );
  }
}