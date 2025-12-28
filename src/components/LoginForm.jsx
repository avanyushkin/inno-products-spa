import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Alert, Typography, Paper } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

function LoginForm() {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
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
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      
      const user = users.find(u => u.username === formData.login && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate("/home");
      } else {
        setError("Incorrect login or password");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}
    >
      <Paper
        elevation={2}
        sx={{ p: 4, width: '100%', maxWidth: 400 }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>Sign In</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" name="login" value={formData.login} onChange={handleChange} disabled={loading} sx={{ mb: 2 }} />
          
          <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} disabled={loading} sx={{ mb: 3 }}/>
          
          <Button type="submit" fullWidth variant="contained" disabled={loading || !formData.login || !formData.password} startIcon={<LoginIcon />}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Button fullWidth variant="text" onClick={() => navigate("/register")} disabled={loading} sx={{ mt: 2 }}>
            Create Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;