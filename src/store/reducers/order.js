import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    default: return state;
  }
};

const purchaseInit = (state, action) => {
  return {
    purchased: false,
  };
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
  };
}

const purchaseBurgerFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
}

const purchaseBurgerStart = (state, action) => {
  return {
    ...state,
    loading: true,
    purchased: true
  };
}

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders
  };
}

const fetchOrdersFailed = (state, action) => {
  return {
    ...state,
    loading: false
  };
}

const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
}

export default reducer;