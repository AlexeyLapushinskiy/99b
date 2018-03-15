import React from 'react';
import { Table, Dropdown, Icon } from 'semantic-ui-react'

import { DeleteIcon } from './style'


export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      cost: null,
      quantity: null,
      currency: 'USD',
      images: [],
      negative: false
    };

    this.upQuantity = this.upQuantity.bind(this);
    this.downQuantity = this.downQuantity.bind(this);
    this.editCost = this.editCost.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editQuantity = this.editQuantity.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.agreeToEdit = this.agreeToEdit.bind(this);
  };

  agreeToEdit(e) {
    e.target.setAttribute('contentEditable', 'true');
    e.target.focus();
  };

  changeCurrency(e) {
    this.setState({ currency: e.target.value });
  };

  deleteProduct() {
    this.setState((prevState) => { return {negative: !prevState.negative} });
  };

  editCost(e) {
    let cost = e.target.innerText;
    this.setState({ cost: cost });
  };

  editQuantity(e) {
    let quantity = e.target.innerText;
    this.setState({ quantity: quantity });
  };

  upQuantity() {
    this.setState((prevState) => { return {quantity: prevState.quantity + 1}; });
  };

  downQuantity() {
    this.setState((prevState) => { return {quantity: prevState.quantity - 1}; });
  };

  componentWillMount() {
    this.setState({ id: this.props.product.id });
    this.setState({ name: this.props.product.name });
    this.setState({ cost: this.props.product.cost });
    this.setState({ quantity: this.props.product.quantity });
  };

  render() {

    const options = [
      { key: 1, text: 'USD', value: 'USD' },
      { key: 2, text: 'EUR', value: 'EUR' }
    ];

    return (
      <Table.Row negative={this.state.negative}>
        <Table.Cell>{this.props.index+ 1}</Table.Cell>
        <Table.Cell>{this.state.id}</Table.Cell>
        <Table.Cell>{this.state.name}</Table.Cell>
        <Table.Cell>
          <div contentEditable={false} onChange={this.editQuantity} onClick={this.agreeToEdit}>{this.state.quantity}</div>
        </Table.Cell>
        <Table.Cell>
          <div contentEditable={false} onChange={this.editCost} onClick={this.agreeToEdit}>{this.state.cost}</div>
        </Table.Cell>
        <Table.Cell>
          <Dropdown text={this.state.currency} options={options} simple item onChange={this.changeCurrency} />
        </Table.Cell>
        <Table.Cell>images</Table.Cell>
        <Table.Cell>
          <DeleteIcon>
            <Icon name={this.state.negative ? 'undo' : 'remove'} size='big' onClick={this.deleteProduct} />
          </DeleteIcon>
        </Table.Cell>
      </Table.Row>
    );
  };
};
