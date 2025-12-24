import React from 'react';
import '../styles/Card.scss';

const ProductCard = ( { product } ) => {
  return (
    <>
      <div className='card'>
        <div className='image__container'>
          <img src={product.images} alt={product.title} className='image' />
        </div>
        <div className='content'>
          <h3 className='title'>{product.title}</h3>
          <p className='category'>{product.category}</p>

          <div className='rating'>
            {'*'.repeat(Math.round(product.rating))}
            <span className='rating__value'>({product.rating})</span>
          </div>

          <div className='price__container'>
            <span className='price'>${product.price}</span>
            <button className='button'>Add to card</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;