import React from 'react';
import axios from 'axios'
import { Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { ProductName, ProductCost, ProctDetailWrap, ProductWrap, AddToProductBacket } from './style';
import Header from '../assets/header/header';


export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productList: null,
      activePage: 'Products',
      productsInCart: [],
      stripeKeyArray: [],
      userInfo: this.props.userInfo
    };

    this.getProducts = this.getProducts.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
    this.openProduct = this.openProduct.bind(this);
    this.addToProductCart = this.addToProductCart.bind(this);
    this.saveToLS = this.saveToLS.bind(this);
    this.setDataFromLS = this.setDataFromLS.bind(this);
  };

  setDataFromLS(productsFromLS, stripeKeysFromLS) {
    let stripeKeys = stripeKeysFromLS.split(',');
    this.setState({ productsInCart: productsFromLS });
    this.setState({ stripeKeyArray: stripeKeys });
  };

  addToProductCart(e) {
    const productID = parseInt(e.target.getAttribute('id'));
    const stripeKey = e.target.getAttribute('stripekey');
    this.saveToLS(productID, stripeKey);
  };

  saveToLS(productID, stripeKey) {
    let copiedProductArray = this.state.productsInCart.slice();
    let copiedStripeKeyArray = this.state.stripeKeyArray.slice();
    let productIndex = copiedProductArray.findIndex((el) => {
      return !!(el[productID]);
    });
    if (productIndex !== -1) {
      copiedProductArray[productIndex][productID]++;
    } else {
      copiedProductArray.push({[productID]: 1});
    }

    let checkArray = null;
    for (let i = 0; i < copiedStripeKeyArray.length; i++) {
      if (copiedStripeKeyArray[i] === stripeKey) {
        checkArray = true;
      };
    }
    if(!checkArray) {
      copiedStripeKeyArray.push(stripeKey);
    };
    this.setState({ productsInCart: copiedProductArray });
    this.setState({ stripeKeyArray: copiedStripeKeyArray });
  }

  renderLoading() {
    return (<h4>Loading...</h4>);
  };

  renderProduct(product, i) {
    let productCost = <ProductCost>{product.cost.price}</ProductCost>;
    if(this.props.userRole === "Distributor") {
      productCost = <ProductCost>{product.cost.price/2}</ProductCost>;
    };
    return (
      <Grid.Column key={i}>
        <ProductWrap>
            <Image src={product.images[1]} />
          <ProctDetailWrap>
            <ProductName><Link to={{ pathname: '/product', state: { product: product} }}>{product.name}</Link></ProductName>
            {productCost}
            <AddToProductBacket>
              <Button primary id={product.id} stripekey={product.stripeKey} onClick={this.addToProductCart}>Add to Product cart</Button>
            </AddToProductBacket>
          </ProctDetailWrap>
        </ProductWrap>
      </Grid.Column>
    )
  };

  getProducts(url) {
    axios.get(url)
      .then((res) => {
        let currentUserProducts = [];
        res.data.goods.forEach((item) => {
          let obj = {};
          if(item.stripeKey === "pk_test_R1JX0OeuIlPkMiBE1QmuO0vR") {
            obj.id = item.id;
            obj.name = item.name;
            obj.cost = item.cost.price;
            obj.quantity = item.cost.quantity;
            currentUserProducts.push(obj);
          }
        });
        this.props.getUserProducts(currentUserProducts);
        this.setState({productList: res.data.goods});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openProduct(i) {
    this.props.history.push(`/products/${i}`);
    history.go(`/products/${i}`);
  };

  componentWillMount() {
    const goodsURL = 'http://api.99b.co/goods';
    let productsFromLS = JSON.parse(localStorage.getItem("selectedProducts"));
    let stripeKeysFromLS = localStorage.getItem("producers");
    this.getProducts(goodsURL);
    if(productsFromLS && (Object.keys(productsFromLS).length !== 0)) {
      this.setDataFromLS(productsFromLS, stripeKeysFromLS);
    }
  };

  componentDidUpdate() {
    localStorage.setItem("selectedProducts", JSON.stringify(this.state.productsInCart));
    localStorage.setItem("producers", this.state.stripeKeyArray);
    let productList = this.state.productList;
    this.props.getHeaderProps(productList);
  }

  render() {

    let list = null;
    if (!this.state.productList) {
      return this.renderLoading();
    } else {
      list = this.state.productList.map(this.renderProduct);
    }

    let header = <Header selectedProducts={this.state.productsInCart} />;

    return (
      <div>
        {header}
        <Grid relaxed padded columns={4}>
          <Grid.Row columns={3}>
            {list}
          </Grid.Row>
        </Grid>
      </div>
    );
  };
};