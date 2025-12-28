import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.scss';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div className='card' onClick={handleCardClick}>
      <div className='image__container'>
        <img src={product.images} alt={product.title} className='image' />
      </div>
      <div className='content'>
        <h3 className='title'>{product.title}</h3>
        <p className='category'>{product.category}</p>

        <div className='rating'>
          {'★'.repeat(Math.round(product.rating))}
          {'☆'.repeat(5 - Math.round(product.rating))}
          <span className='rating__value'>({product.rating})</span>
        </div>

        <div className='price__container'>
          <span className='price'>${product.price}</span>
          <button className='button'>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;