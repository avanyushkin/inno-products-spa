import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, TextField, Button, Typography, Box } from '@mui/material';
import { ShoppingCart, AdminPanelSettings } from '@mui/icons-material';
import { authUtils } from '../utils/auth';

function Header({ onSearch = () => {} }) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  
  const isLoggedIn = authUtils.isAuthenticated();
  const isAdmin = authUtils.isAdmin();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ cursor: 'pointer' }} 
          onClick={() => navigate('/home')}
        >
          Shop
        </Typography>
        
        <TextField 
          size="small" 
          placeholder="Search products..." 
          value={searchInput} 
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: 1 }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isAdmin && (
            <Button color="inherit" onClick={() => navigate('/admin')}>
              Admin
            </Button>
          )}
          
          <Button color="inherit" onClick={() => navigate('/cart')}>
            Cart
          </Button>
          
          {isLoggedIn ? (
            <Button color="inherit" onClick={() => { authUtils.logout(); navigate('/login'); }}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;