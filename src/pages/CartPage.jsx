import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {

  const navigate = useNavigate();

  const handleBackToHomePage = () => {
    navigate('/home');
  };

  return (
    <>
      <h2>Cart is Empty</h2>
      <div onClick={handleBackToHomePage}>back to home page</div>
    </>
  );
}

export default CartPage;