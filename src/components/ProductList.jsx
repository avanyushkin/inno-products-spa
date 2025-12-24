import React from 'react';
import { useDummyJSON } from '../utils/api.js';
import ProductCard from './ProductCard.jsx';
import '../styles/ProductList.scss';

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
      <div className='product-list'>
        {data.products.map(product => {
          return (
            <ProductCard key={product.id} product={product} />
          );
        })}
      </div>
    </>
  );
}

export default ProductList;