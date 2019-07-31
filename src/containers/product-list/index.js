import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as allActions from '../../actions';

import './product-list.css';

export class ProductList extends Component {
  state = {
    displayedProducts: this.props.products
  }

  componentDidMount() {
    this.props.getProductList();
  }
  
  sortProducts = (event) =>{
    const sorted = this.props.products;    
    switch (event.target.value) {
      case 'alphabetically':
        return this.setState({productsToShow: sorted.sort((a,b) => (a.name > b.name) ? 1 : -1)});
      case 'priceToHigh':
        return  this.setState({productsToShow: sorted.sort((a,b) => (a.price > b.price) ? 1 : -1)});
      case 'priceToLow':
        return  this.setState({productsToShow: sorted.sort((a,b) => (a.price < b.price) ? 1 : -1)});
      case 'availability':
        return  this.setState({productsToShow: sorted.sort((a,b) => (a.available < b.available) ? 1 : -1)});    
      default: return this.props.products
    }
  }

  renderSortingDrop = () => {
    return <select 
              defaultValue="sort" 
              onChange={(event)=> this.sortProducts(event)}
              className='dropdown'>
              <option value="sort">Sort by</option>
              <option value="alphabetically">Sort names alphabetically</option>
              <option value="priceToHigh">Price from Low to High</option>
              <option value="priceToLow">Price from High to Low</option>
              <option value="availability">Availability</option>
           </select>
   }

  renderProducts() {
    // console.log(this.state);
    return this.props.products.map((i, index) => (
      <div className="product_list_item" key={index}>
        <p>{i.name}</p>
        <p>Price: {i.price}</p>
        <p>{i.available > 0 ? 'In stock' : 'Sold out'}</p>
        <button className="add-to-cart-btn" disabled={!i.available} onClick={() => this.props.addToCart(i)}>Add to card</button>
      </div>
    ));
  }

  render() {
    return (
      <div className="App-product_list">
        {this.props.products ? this.renderProducts() : 'Please wait till products load to the store...'}
        {this.renderSortingDrop()}
      </div>);
  }
}

const mapStateToProps = state => ({products: state.products.products});
const mapDispatchToProps = dispatch => ({
  addToCart: (product) => dispatch(allActions.addToCart(product)),
  getProductList: () => dispatch(allActions.getProductList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);