import React from 'react';
import { Table, Button } from 'semantic-ui-react';

import SingleCartProduct from '../singleCartProduct/singleCartProduct';
import Header from '../assets/header/header';


export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: this.props.location.state.productList,
      cartProducts: this.props.location.state.cartProducts,
      cartProductList: null
    };

    this.renderRow = this.renderRow.bind(this);
    this.getSelectedProducts = this.getSelectedProducts.bind(this);
    this.toSentRequest = this.toSentRequest.bind(this);
  };

  toSentRequest() {
    console.log("no request");
  };

  getSelectedProducts() {
    let cartProductList = this.state.cartProducts.map((cartEl) => {
      let productFromListArray = JSON.parse(this.state.productList);
      console.log("productFromListArray");
      console.log(productFromListArray);
      let productFromList = productFromListArray.find((el) => {
        console.log(`${el.id} : ${Object.keys(cartEl)[0]}`);
        return (el.id === +Object.keys(cartEl)[0]);
      });
      console.log("productFromList");
      console.log(productFromList);
      productFromList.ammount = cartEl[Object.keys(cartEl)[0]];
      return productFromList;
    });
    this.setState({cartProductList: cartProductList})
  };

  componentWillMount() {
    this.getSelectedProducts();
  };

  renderRow(product, i) {
    return <SingleCartProduct key={i} product={product} />
  };

  render() {

    const rows = this.state.cartProductList.map(this.renderRow);

    return (
      <div>
        <Header />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
        {/*<CheckoutForm />*/}
        <Button primary floated='right' id="customButton" onClick={this.toSentRequest}>
          Buy
        </Button>
      </div>
    );
  };
};