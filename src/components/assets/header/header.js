import React from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productList: null,
      selectedProducts: [],
      userName: '',
      userRole: '',
      userEmail: ''
    };
  };

  componentWillMount() {
    let productList = localStorage.getItem("productList");
    let userName = localStorage.getItem("userName");
    let userRole = localStorage.getItem("userRole");
    let userEmail = localStorage.getItem("userEmail");

    let arrOfProduct = [];
    let selectedProducts = localStorage.getItem("selectedProducts");
    if(selectedProducts) {
      let strOfProduct = selectedProducts.slice(1, -1);
      arrOfProduct = strOfProduct.split(',');
    }

    this.setState({selectedProducts: arrOfProduct});
    this.setState({productList: productList});
    this.setState({userName: userName});
    this.setState({userRole: userRole});
    this.setState({userEmail: userEmail});
  };

  componentWillReceiveProps(nextProps) {
    this.setState({selectedProducts: nextProps.selectedProducts});
  };

  render() {

    let editProductsItem = null;
    let userRole = localStorage.getItem("userRole");
    if(userRole === "Producer") {
      editProductsItem =
        <Link to="/edit" style={{display: "-webkit-box"}}>
          <Menu.Item name='Edit products' onClick={this.handleItemClick} />
        </Link>
    }

    return (
      <div>
        <Menu pointing>
          <Menu.Item name='home' onClick={this.handleItemClick} />
          {editProductsItem}
          <Menu.Menu position='right'>
            <div>
              <div>{this.state.userName}</div>
              <div>{this.state.userRole}</div>
              <div>{this.state.userEmail}</div>
            </div>
            <Menu.Item>
              <Link to={{ pathname: '/cart', state: {
                productList: this.state.productList,
                cartProducts: this.state.selectedProducts
              } }}>
                <span>{this.state.selectedProducts.length}</span>
                <Icon name='shop' size='big' />
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  };
};