import React from 'react';
import { useDummyJSON } from '../utils/api.js';
import ProductCard from './ProductCard.jsx';
import '../styles/ProductList.scss';

function ProductList({ searchTerm = "" }) {
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

  const filtered = data.products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='product-list'>
        {filtered.map(product => {
          return (
            <ProductCard key={product.id} product={product} />
          );
        })}
        
       
      </div>
    </>
  );
}

export default ProductList;