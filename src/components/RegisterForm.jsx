import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.scss';

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
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const checkResponse = await fetch('http://localhost:3001/users');
      const users = await checkResponse.json();
      
      const existingUser = users.find(it => it.username === formData.username);
      
      if (existingUser) {
        setError('already have user with such name');
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
        throw new Error('Something went wrong...');
      }
    } catch (err) {
      console.error(err);
      setError('try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-form">
      <div className="register-form__container">
        <h2 className="register-form__title">Register</h2>
        
        {error && (
          <div className="register-form__error">
            {error}
          </div>
        )}
        
        <form className="register-form__form" onSubmit={handleSubmit}>
          <div className="input-columns__register">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Login"
              className="register-form__input"
              disabled={loading}
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New password"
              className="register-form__input"
              disabled={loading}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="register-form__input"
              disabled={loading}
              required
            />
          </div>
          
          <div className="register-form__button">
            <button 
              type="submit" 
              className="register-form__button register-form__button--submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="register-form__back-button">
          <button 
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;