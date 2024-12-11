// Cart.js
import React, { useContext } from 'react';
import { CartContext } from './cartcontext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
    </div>
  );
};

export default Cart;
