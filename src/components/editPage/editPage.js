import React from 'react';
import { Table, Button } from 'semantic-ui-react';

import SingleProduct from '../singleProduct/singleProduct';
import AddProductPopup from '../addProductPopup/addProductPopup';
import Header from '../assets/header/header';


export default class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserProducts: []
    };

    this.renderSingleProduct = this.renderSingleProduct.bind(this);
    this.changeCurrentUserProducts = this.changeCurrentUserProducts.bind(this);
  };

  changeCurrentUserProducts(currentUserProducts) {
    this.props.changeCurrentUserProducts(currentUserProducts);
  };

  renderSingleProduct(product, i) {
    return <SingleProduct key={i} product={product} index={i} />
  };

  componentWillMount() {
    let currentUserProducts = JSON.parse(this.props.currentUserProducts);
    this.setState({ currentUserProducts: currentUserProducts });
  };

  render() {

    let list = this.state.currentUserProducts.map(this.renderSingleProduct);

    let addProductPopup = <AddProductPopup changeCurrentUserProducts={this.changeCurrentUserProducts} />;

    return (
      <div>
        <Header />
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
              <Table.HeaderCell>Currency</Table.HeaderCell>
              <Table.HeaderCell>Images</Table.HeaderCell>
              <Table.HeaderCell>Delete product</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='8'>
                <Button floated='right' icon primary size='big'>Save changes</Button>
                {addProductPopup}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  };
};