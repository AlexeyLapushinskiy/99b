import React from 'react';
import {Link} from 'react-router-dom'
import {Button, Icon, Image, Item, Divider} from 'semantic-ui-react'
import {PayBtn, ProductWrapper} from './style';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  toOpenCheckout(e) {

    let handler = StripeCheckout.configure({
      key: 'pk_test_mh3Z6TRQVMcBmv8qKyMLALaA',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function (token) {
      }
    });

    handler.open({
      name: 'Alex',
      description: '2 widgets',
      amount: 2000
    });
    e.preventDefault();
  };


  render() {
    const props = this.props.location.state.product;
    // console.log(props);


// Close Checkout on page navigation:
    window.addEventListener('popstate', function () {
      handler.close();
    });

    return (
      <div>
        <ProductWrapper>
          <Item.Group divided>
            <Item>
              <Item.Image src={props.images[1]} size='large'/>

              <Item.Content>
                <Item.Header as='a'>{props.name}</Item.Header>
                <Item.Meta>
                  <span className='price'>${props.cost.price}</span>
                </Item.Meta>
                {/*<Item.Description>paragraph</Item.Description>*/}
                <Item.Extra>
                  <PayBtn>
                    <Button primary floated='right' id="customButton" onClick={this.toOpenCheckout}>
                      Buy
                      <Icon name='right chevron'/>
                    </Button>
                  </PayBtn>
                  <Link to='/products'>
                    <Button>Back</Button>
                  </Link>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </ProductWrapper>
      </div>
    );
  };
};