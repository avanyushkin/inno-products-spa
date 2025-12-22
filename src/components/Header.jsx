import React, { useState } from 'react';
import '../styles/Header.scss';
import { FaShoppingCart, FaUserPlus } from 'react-icons/fa';

function Header() {

  const [searchInput, setSearchInput] = useState("");
  
  const handleClearSearchInput = () => {
    setSearchInput("");
  }

  return (
    <>
      <div className="header">
      <div className="search-container">
          <input 
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
          />
        </div>

        <div className="icons-container">
          <div className="icon-wrapper">
            <FaShoppingCart size={28} color="#007bff" />
          </div>
          <div className="icon-wrapper">
            <FaUserPlus size={28} color="#007bff" />
          </div>
        </div>
      </div>
    </>
  );    
}

export default Header;