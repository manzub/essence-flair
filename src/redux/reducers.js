const { default: actionTypes } = require("./types");

function userReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.loginUser:
      return { ...state, ...action.payload }
  
    default:
      return state;
  }
}

function shoppingCart(state = { items: [] }, action) {
  switch (action.type) {
    case actionTypes.addToCart:
      let arr = [...state.items]
      let item = arr.find(x => x.id === action.payload.id)
      if(item) {
        arr = arr.filter(x => x.id !== item.id)
        item.qty = item.qty + 1;
      }
      arr.push(item || action.payload)
      return {...state, items:arr}
    case 'clearCart':
      return state
    default:
      return state;
  }
}

function shopReducer(state = { categories: [], shop: { products: [], pages: null }, loaded: false }, action) {
  switch (action.type) {
    case actionTypes.setCategories:
      return {...state, categories: action.payload}
    case actionTypes.loadShop:
      return {...state, ...action.payload, loaded: true}
    default:
      return state;
  }
}

module.exports = {
  userReducer,
  shoppingCart,
  shopReducer
}