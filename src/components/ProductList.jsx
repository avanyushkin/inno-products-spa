import React from 'react';
import { useDummyJSON } from '../utils/api.js';

function ProductList() {
  const {data, loading, error} = useDummyJSON('/products', { limit: 30 });

  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <h2>No products</h2>
      </>
    );
  }

  return (
    <>
      {data.products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}

export default ProductList;