import * as actionTypes from './actionTypes';

export const getCartItems = () => ({type: actionTypes.GET_CART_ITEMS});
export const addToCart = payload => ({type: actionTypes.ADD_TO_CART, product:payload});
export const productQuantityChange = (quantity, index) => ({type: actionTypes.PRODUCT_QUANTITY_CHANGE, quantity:quantity, index: index}); 
export const removeFromCart = id => ({type: actionTypes.REMOVE_FROM_CART, productId: id});
export const clearCart = () => ({type: actionTypes.CLEAR_CART});