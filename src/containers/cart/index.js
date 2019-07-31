import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

import './cart.css';

export class Cart extends Component {
  state = {productTotal: 0};

  componentDidMount() {
    return this.props.inCart.length !== 0 ? this.getProductTotal() : undefined 
  }

  componentDidUpdate(props,state) {
    if (state.productTotal === this.state.productTotal && props.inCart !== this.props.inCart) {
      if ( this.props.inCart.length === 0) {
        this.setState({productTotal: 0});
      } else {
        this.getProductTotal()
      }
    }
  }

  getProductTotal = () => {
    let temprSum = 0;
    this.props.inCart.forEach(i => { temprSum = i.price * i.quantity + temprSum })
    this.setState({productTotal: temprSum})
  }

  removeFromCart(product) {
    this.props.removeFromCart(product);
  }

  renderCartList() {
    return  <React.Fragment>
      { this.props.inCart.map((product, index) => (
      <div> 
          <p>{product.name}</p>
          <p>Price: ${product.price}</p>
        <div>
          <p>Max: {product.available}</p>
          <input 
          className='productQuantityChange'
          type='number'
          value={product.quantity}
          onChange={(event) => this.props.productQuantityChange(event.target.value, index)}
          />
          <p className="productTotal">Sum: {product.quantity * product.price}</p>
          <p className="productDelete" onClick={() => this.removeFromCart(product)}>Delete item</p>
        </div>
      </div>  
      ))}
      <div className="cartTracking">
        <button onClick={this.props.clearCart}>Clear Cart</button>
        <button onClick={() => window.confirm(`Your total price is $ ${this.state.productTotal}`) ? 
          this.props.clearCart() : window.alert('You\'re welcome to proceed with your shopping and submit it later ;)')}>
          Submit your Order and Proceed
        </button>
      </div>
      </React.Fragment>
  }
  render() {
    return (
      <div className="App-cart">
        {this.props.inCart.length ? this.renderCartList() : 'Your cart is empty :('}
      </div>
    )
  }
}
const mapStateToProps = state => ({inCart: state.cart.inCart});
const mapDispatchToProps = dispatch => ({
  productQuantityChange: (quantity, index) => dispatch(actionCreators.productQuantityChange(quantity, index)),
  removeFromCart: (product) => dispatch(actionCreators.removeFromCart(product)),    
  clearCart: () => dispatch(actionCreators.clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
