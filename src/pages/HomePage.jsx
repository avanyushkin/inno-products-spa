import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ProductList from '../components/product/ProductList.jsx';
import { useDebounce } from '../hooks/useDebounce.js';

function HomePage() {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header onSearch = {handleSearch} />
      <ProductList searchTerm = {debouncedSearchTerm} />
    </>
  );
}

export default HomePage;