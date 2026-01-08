import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { API_BASE_URL } from '../../config/constants.js';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        })
      });

      const data = await response.json();

      if (response.ok && (data.accessToken || data.token)) {
        localStorage.setItem('token', data.accessToken || data.token);
        localStorage.setItem('currentUser', JSON.stringify(data));
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            margin="normal"
            required
          />
          
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Button 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={() => navigate('/register')}
          >
            Create Account
          </Button>
        </form>

      </Paper>
    </Box>
  );
}

export default LoginForm;