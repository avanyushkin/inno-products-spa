import React, { useState, useRef, useEffect } from 'react';
import '../styles/Header.scss';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleClearSearchInput = () => {
    setSearchInput("");
  };
  
  const handleCartClick = () => {
    navigate("/cart");
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isLoggedIn = !!currentUser;
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate("/login");
    setShowUserMenu(false);
  };
  
  const handleUserClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/register");
    }
  };
  
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className="icon-wrapper" onClick={handleCartClick}>
            <FaShoppingCart size={28} color="blue" />
          </div>

          <div className="user-menu-container" ref={menuRef}>
            <div className="icon-wrapper" onClick={handleUserClick}>
              {isLoggedIn ? (
                <>
                  <FaUserCircle size={28} color="green" />
                  <span className="username">{currentUser.username}</span>
                </>
              ) : (
                <FaUserPlus size={28} color="blue" />
              )}
            </div>
            
            {isLoggedIn && showUserMenu && (
              <div className="dropdown-menu">
                <div className="menu-item user-info">
                  <FaUserCircle size={20} />
                  <span>{currentUser.username}</span>
                </div>
                <div className="menu-divider"></div>
                <div className="menu-item logout-item" onClick={handleLogout}>
                  <FaSignOutAlt size={20} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );    
}

export default Header;