import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error
  };
}

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('orders.json', orderData).then(response => {
      dispatch(purchaseBurgerSuccess(response.data))
    }).catch(error => {
      purchaseBurgerFailed(error)
    });
  }
}