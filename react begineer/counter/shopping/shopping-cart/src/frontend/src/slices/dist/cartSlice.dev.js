"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.clearCart = exports.getTotals = exports.removeFromCart = exports.decreaseCart = exports.addToCart = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _reactToastify = require("react-toastify");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};
var cartSlice = (0, _toolkit.createSlice)({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: function addToCart(state, action) {
      var existingIndex = state.cartItems.findIndex(function (item) {
        return item.id === action.payload.id;
      });

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = _objectSpread({}, state.cartItems[existingIndex], {
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1
        });

        _reactToastify.toast.info("Increased product quantity", {
          position: "bottom-left"
        });
      } else {
        var tempProductItem = _objectSpread({}, action.payload, {
          cartQuantity: 1
        });

        state.cartItems.push(tempProductItem);

        _reactToastify.toast.success("Product added to cart", {
          position: "bottom-left"
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: function decreaseCart(state, action) {
      var itemIndex = state.cartItems.findIndex(function (item) {
        return item.id === action.payload.id;
      });

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        _reactToastify.toast.info("Decreased product quantity", {
          position: "bottom-left"
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        var nextCartItems = state.cartItems.filter(function (item) {
          return item.id !== action.payload.id;
        });
        state.cartItems = nextCartItems;

        _reactToastify.toast.error("Product removed from cart", {
          position: "bottom-left"
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: function removeFromCart(state, action) {
      state.cartItems.map(function (cartItem) {
        if (cartItem.id === action.payload.id) {
          var nextCartItems = state.cartItems.filter(function (item) {
            return item.id !== cartItem.id;
          });
          state.cartItems = nextCartItems;

          _reactToastify.toast.error("Product removed from cart", {
            position: "bottom-left"
          });
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals: function getTotals(state, action) {
      var _state$cartItems$redu = state.cartItems.reduce(function (cartTotal, cartItem) {
        var price = cartItem.price,
            cartQuantity = cartItem.cartQuantity;
        var itemTotal = price * cartQuantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;
        return cartTotal;
      }, {
        total: 0,
        quantity: 0
      }),
          total = _state$cartItems$redu.total,
          quantity = _state$cartItems$redu.quantity;

      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart: function clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      _reactToastify.toast.error("Cart cleared", {
        position: "bottom-left"
      });
    }
  }
});
var _cartSlice$actions = cartSlice.actions,
    addToCart = _cartSlice$actions.addToCart,
    decreaseCart = _cartSlice$actions.decreaseCart,
    removeFromCart = _cartSlice$actions.removeFromCart,
    getTotals = _cartSlice$actions.getTotals,
    clearCart = _cartSlice$actions.clearCart;
exports.clearCart = clearCart;
exports.getTotals = getTotals;
exports.removeFromCart = removeFromCart;
exports.decreaseCart = decreaseCart;
exports.addToCart = addToCart;
var _default = cartSlice.reducer;
exports["default"] = _default;