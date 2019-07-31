import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

import './header.css';


const header = (props) => {
  return (
    <>
      <></>
      <header className="App-header">
        <Link to="/" exact>
          <h1 className="App-header">My simple shop</h1>
        </Link>
        <div className="cart-info-container">
          <button onClick={props.addNewProduct}></button>>
          <Link to="/cart">
            <h2>Cart {props.inCart.length}</h2>
          </Link>
        </div>
      </header>
    </>
  )
}

const mapStateToProps = state => ({ inCart: state.cart.inCart });
const mapDispatchToProps = dispatch => ({
  addNewProduct: () => dispatch(actionCreators.addNewProduct())
});
export default connect(mapStateToProps, mapDispatchToProps)(header);