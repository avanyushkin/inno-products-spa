import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, TextField, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import { Search, ShoppingCart, Person } from '@mui/icons-material';
import { authService } from '../utils/auth';

function Header({ onSearch = () => {} }) {
  const [searchInput, setSearchInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const isLoggedIn = authService.isAuthenticated();

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    handleUserMenuClose();
  };

  const handleProfileClick = () => {
    handleUserMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/home')}>
          Shop
        </Typography>
        
        <TextField size="small" placeholder="Search..." value={searchInput} onChange={handleSearchChange}
          sx={{ 
            flexGrow: 1, 
            backgroundColor: 'white', 
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              height: 40,
            }
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit" onClick={handleCartClick}>
            <ShoppingCart />
          </IconButton>
          <IconButton 
            color="inherit" 
            onClick={(e) => {
              if (isLoggedIn) {
                handleUserMenuOpen(e);
              } else {
                navigate('/login');
              }
            }}
          >
            <Person />
          </IconButton>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleUserMenuClose}>
          <MenuItem onClick={handleProfileClick}>
            Profile ({currentUser?.username || currentUser?.firstName})
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;