import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import createHistory from "history/createBrowserHistory";
import axios from "axios/index";


export default class FBAuth extends React.Component {

  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  };


  responseFacebook(res) {
    const url = 'http://api.99b.co/authorizeSocial';
    const body = {
      "role": this.props.role || 'Consumer',
      "token": res.accessToken,
    };
    axios.post(url, body)
      .then(function (res) {
        const history = createHistory();
        history.push('/products');
        if (res.data.jwt) {
          console.log(res.data.jwt);
          history.go('/products');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fbClicked(e) {
  }

  render() {
    return (
      <FacebookLogin
        appId="398922873631725"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email"
        // onClick={this.fbClicked}
        callback={this.responseFacebook}/>
    )
  }
}

