import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductList from '../components/ProductList.jsx';

function HomePage() {
  return (
    <>
      <Header />
      <ProductCard />
      <ProductList />
    </>
  );
}

export default HomePage;