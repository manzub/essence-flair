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

const shopState = {
  categories: [
    {id:'1',name:'Parfum'},
    {id: "2", name: "Bath & Shower"},
    {id: "3", name: "Body Care"},
    {id: "4", name: "Hair"},
    {id: "5", name: "Deodorant"}
  ],
}
function shopReducer(state = { ...shopState, shop: { products: [], pages: null } }, action) {
  switch (action.type) {
    case actionTypes.setCategories:
      return {...state, categories: action.payload}
    case actionTypes.loadShop:
      return {...state, ...action.payload, loaded: true}
    default:
      return {...state, loaded: true};
  }
}

module.exports = {
  userReducer,
  shoppingCart,
  shopReducer
}