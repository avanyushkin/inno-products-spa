import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDummyJSON } from '../utils/api.js';
import Header from './Header.jsx';
import '../styles/ProductDetail.scss';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: product, loading, error } = useDummyJSON(`/products/${id}`);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading">Loading...</div>
      </>
    );
  }
  
  if (error || !product) {
    return (
      <>
        <Header />
        <div className="error">
          <h2>Product not found</h2>
          <button onClick={handleBackClick}>Go Back</button>
        </div>
      </>
    );
  }
  
  const images = Array.isArray(product.images) ? product.images : [product.images];

  return (
    <>
      <Header />
      <div className="product-detail">
        <button className="back-btn" onClick={handleBackClick}>Back</button>
        
        <div className="product-content">
          <div className="product-image">
            <img src={images[selectedImage]} alt={product.title} />
          </div>
          
          <div className="product-info">
            <h1>{product.title}</h1>
            <div className="rating">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
              <span>({product.rating})</span>
            </div>
            <div className="price">
              ${product.price}
              {product.discountPercentage && (
                <span className="discount"> -{product.discountPercentage}%</span>
              )}
            </div>
            <div className="category">Category: {product.category}</div>
            <div className="description">
              <p>{product.description}</p>
            </div>
            <div className="actions">
              <button className="cart-btn">Add to Cart</button>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;