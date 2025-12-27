import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ProductList from '../components/ProductList.jsx';

function HomePage() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header onSearch = {handleSearch} />
      <ProductList searchTerm = {searchTerm} />
    </>
  );
}

export default HomePage;