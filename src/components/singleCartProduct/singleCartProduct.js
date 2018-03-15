import React from 'react';
import { Header, Table, Button } from 'semantic-ui-react'


export default class SingleCartProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cost: null,
      totalCost: null,
      quantity: 1
    };

    this.handleMinus = this.handleMinus.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
  };

  handleMinus() {
    this.setState((prevState) => { return {quantity: prevState.quantity - 1} });
  };

  handlePlus() {
    this.setState((prevState) => { return {quantity: prevState.quantity + 1} });
  };

  componentWillMount() {
    this.setState({ name: this.props.product.name });
    this.setState({ cost: this.props.product.cost.price });
    this.setState({ totalCost: this.props.product.cost.price });
  };

  render() {

    return (
        <Table.Row>
          <Table.Cell>
            <Header as='h4'>
              <Header.Content>
                {this.state.name}
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {this.state.quantity * this.state.cost}
          </Table.Cell>
          <Table.Cell>
            {this.state.quantity}
            <Button.Group>
              <Button icon='minus' onClick={this.handleMinus} />
              <Button icon='plus' onClick={this.handlePlus} />
            </Button.Group>
          </Table.Cell>
        </Table.Row>
    );
  };
};