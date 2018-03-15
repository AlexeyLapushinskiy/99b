import React from 'react';

class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCard = this.setCard.bind(this);
  };

  setCard(card) {
    card.mount('#card-element');
  };

  handleSubmit(e) {
    e.preventDefault();

    const stripe = e.target.getAttribute('stripe');

    stripe.createToken(card).then(function(result) {
    stripeTokenHandler(result.token);
    });
  };

  render() {

    let stripe = Stripe('pk_test_R1JX0OeuIlPkMiBE1QmuO0vR');
    let elements = stripe.elements();
    let style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    let card = elements.create('card', {style: style});
    // console.log(typeof (card));
    // this.setCard(card);
    card.mount('#card-element');

    return (
      <form action="/charge" method="post" id="payment-form" stripe={stripe} onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label>
            Credit or debit card
            <div id="card-element">
              {/*{card}*/}
            </div>
          </label>

        </div>

        <button>Submit Payment</button>
      </form>
    );
  };
}

export default CheckoutForm;