import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react'


export default class AddProductPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      quantity: null,
      cost: null,
      currency: 'USD'
    };

    this.changeName = this.changeName.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.changeCost = this.changeCost.bind(this);
    this.createProduct = this.createProduct.bind(this);
  };


  changeName(e) {
    this.setState({ name: e.target.value });
  };

  changeQuantity(e) {
    this.setState({ quantity: e.target.value });
  };

  changeCost(e) {
    this.setState({ cost: e.target.value });
  };

  changeCurrency(e) {
    this.setState({ currency: e.target.value });
  };

  createProduct() {
    let newProduct = {
      id: + new Date(),
      cost: this.state.cost,
      name: this.state.name,
      quantity: this.state.quantity
    };
    this.setState({ id: newProduct.id });
    let currentUserProducts = JSON.parse(localStorage.getItem("currentUserProducts"));
    currentUserProducts.push(newProduct);
    let jsonList = JSON.stringify(currentUserProducts);
    this.props.changeCurrentUserProducts(jsonList);
  };


  render() {

    const options = [
      { key: 1, text: 'USD', value: 'USD' },
      { key: 2, text: 'EUR', value: 'EUR' }
    ];

    return (
        <Modal trigger={<Button>Create product</Button>}>
          <Modal.Header>Create new product</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group>
                <Form.Input placeholder='Name' onChange={this.changeName} />
                <Form.Input placeholder='Quantity' onChange={this.changeQuantity} />
                <Form.Input placeholder='Cost' onChange={this.changeCost} />
                <Form.Dropdown text={this.state.currency} options={options} simple item onChange={this.changeCurrency} />
              </Form.Group>
              <Form.Button onClick={this.createProduct}>Create</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
    );
  };
};