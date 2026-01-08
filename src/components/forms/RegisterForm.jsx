import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { API_BASE_URL } from '../../config/constants.js';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: parseInt(formData.age) || 0
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.id) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }} >
      <Paper elevation={2} sx={{ p: 4, width: '100%', maxWidth: 400, }} >
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>Create Account</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Username *" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
            disabled={loading} 
            sx={{ mb: 2 }} 
            required
          />
          
          <TextField 
            fullWidth 
            label="Email *" 
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange}
            disabled={loading} 
            sx={{ mb: 2 }} 
            required
          />
          
          <TextField 
            fullWidth 
            label="Password *" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            disabled={loading}  
            sx={{ mb: 2 }} 
            required
          />
          
          <TextField 
            fullWidth 
            label="First Name" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
            disabled={loading} 
            sx={{ mb: 2 }}
          />
          
          <TextField 
            fullWidth 
            label="Last Name" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange}
            disabled={loading} 
            sx={{ mb: 2 }}
          />
          
          <TextField 
            fullWidth 
            label="Age" 
            name="age" 
            type="number"
            value={formData.age} 
            onChange={handleChange}
            disabled={loading} 
            sx={{ mb: 3 }}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            disabled={loading || !formData.username || !formData.email || !formData.password}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Button 
            fullWidth 
            variant="text" 
            onClick={() => navigate('/login')} 
            disabled={loading} 
            sx={{ mt: 2 }} 
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterForm;