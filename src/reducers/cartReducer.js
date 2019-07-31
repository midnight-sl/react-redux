import * as actionTypes from '../actions/actionTypes';

const initState = {
  inCart: []
}

const addToCart = (state, product) => {
  product.quantity = 1;
  const cartUpdate = state.inCart.concat(product);
  const isUnique = cartUpdate.filter((el,index) => cartUpdate.indexOf(el) === index);
  return {...state, inCart: isUnique};
}

const removeFromCart = (state, productId) => {
  const cartUpdate = state.inCart.filter(el => el !== productId);
  return { ...state, inCart: cartUpdate }
}

const clearCart = (state) => {
  return { ...state, inCart: state.inCart = [] }
}

const productQuantityChange = (state, quantity, index) => {
  const cart = [...state.inCart];
  const product = {...cart[index]};
  product.quantity = quantity++;
  if (product.quantity <= 0) {
    product.quantity = 1
  }
  if (product.quantity > product.available) {
    product.quantity = product.available
  }
  cart[index] = product;
  return {...state, inCart: cart}
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CART_ITEMS:
      return state.inCart;
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action.product);
    case actionTypes.PRODUCT_QUANTITY_CHANGE:
      return productQuantityChange(state, action.quantity, action.index);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action.productId);
    case actionTypes.CLEAR_CART:
      return clearCart(state);
    default:
      return state;
  }
}