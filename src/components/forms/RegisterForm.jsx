import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const checkResponse = await fetch('http://localhost:3001/users');
      const users = await checkResponse.json();
      
      const existingUser = users.find(it => it.username === formData.username);
      
      if (existingUser) {
        setError('Username already exists');
        return;
      }
      
      const newUser = {
        id: Date.now(),
        username: formData.username,
        password: formData.password
      };
      
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2, }} >
      <Paper elevation={2} sx={{ p: 4, width: '100%', maxWidth: 400, }} >
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>Create Account</Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}> {error} </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange}
            disabled={loading} sx={{ mb: 2 }} error={!!error && error.includes('Username')}
          />
          
          <TextField fullWidth label="Password" type="password" name="password" value={formData.password}
            onChange={handleChange} disabled={loading}  sx={{ mb: 2 }} error={!!error && error.includes('Password')}
          />
          
          <TextField fullWidth label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword}
            onChange={handleChange} disabled={loading} sx={{ mb: 3 }} error={!!error && error.includes('match')}
          />
          
          <Button type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Button fullWidth variant="text" onClick={() => navigate('/login')} disabled={loading} sx={{ mt: 2 }} >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterForm;