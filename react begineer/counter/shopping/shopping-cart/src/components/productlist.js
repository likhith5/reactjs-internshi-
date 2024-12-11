// ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './productcard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const response = await fetch('https://www.postman.com/api-evangelist/workspace/walmart/collection/35240-2b04ade5-8838-4197-b3c0-06861796932d');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
