import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, browserHistory, Switch  } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import LogIn from "../components/logIn/login";
import SignUp from "../components/registration/signup";
import Products from "../components/products/products";
import Product from "../components/productPage/productPage";
import Cart from "../components/cart/cart";
import ResetPass from "../components/resetPass/resetPass";
import EditPage from "../components/editPage/editPage";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserProducts: null,
      productList: null,
      productsInCart: [],
      userName: '',
      userRole: '',
      userEmail: ''
		};

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserProducts = this.getUserProducts.bind(this);
    this.changeCurrentUserProducts = this.changeCurrentUserProducts.bind(this);
    this.getCurrentUserProducts = this.getCurrentUserProducts.bind(this);
    this.getHeaderProps = this.getHeaderProps.bind(this);
  };

  getHeaderProps(productList) {
    localStorage.setItem("productList", JSON.stringify(productList));
	};

  getCurrentUserProducts() {
    return localStorage.getItem('currentUserProducts');
	};

  changeCurrentUserProducts(currentUserProducts) {
    this.setState({ currentUserProducts: currentUserProducts });
	};

  getUserProducts(currentUserProducts) {
    localStorage.currentUserProducts = JSON.stringify(currentUserProducts);
	};

  getUserInfo(userInfo) {
    localStorage.setItem("userName", userInfo.name);
    localStorage.setItem("userRole", userInfo.role);
    localStorage.setItem("userEmail", userInfo.email);
  	console.log(userInfo);
	};

  render() {

  	let login = () => { return <LogIn UserInfo={this.getUserInfo} /> };

    let products = () => { return <Products
			userName = {localStorage.getItem("userName")}
			userRole = {localStorage.getItem("userRole")}
			userEmail = {localStorage.getItem("userEmail")}
			getUserProducts = {this.getUserProducts}
			getHeaderProps = {this.getHeaderProps}
		/> };

    let editPage = () => { return <EditPage
			currentUserProducts = {this.state.currentUserProducts || this.getCurrentUserProducts()}
			changeCurrentUserProducts = {this.changeCurrentUserProducts}
		/> };

    return (
    	<div>
				<Router history={browserHistory}>
					<Switch>
						<Route exact path="/" component={login} />
						<Route path="/signup" component={SignUp} />
						<Route path="/resetPass" component={ResetPass} />
						<Route path="/products" component={products} />
						<Route path="/product" component={Product} />
						<Route path="/cart" component={Cart} />
						<Route path="/edit" component={editPage} />
					</Switch>
				</Router>
			</div>
    );
  };
}

ReactDOM.render(
  <App />,
	document.getElementById('root')
);
