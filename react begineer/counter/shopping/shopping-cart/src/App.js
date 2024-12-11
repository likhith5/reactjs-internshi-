
import React from 'react';
import { CartProvider } from './components/cartcontext';
import ProductList from './components/productlist';
import Cart from './components/cart';
import ProductCard from './components/productcard';

const App = () => (
  <CartProvider>
    <div className="app">
      <ProductList />
      <Cart />
    </div>
  </CartProvider>
);

export default App;
