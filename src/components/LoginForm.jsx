import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.scss';

function LoginForm() {
  const [formData, setFormData] = useState({
    login : "",
    password : ""
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
        setError("incorrect login or password");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = () => {
    navigate("/register");
  }

  return (
    <div className="login-form">
      <div className="login-form__container">
        <h2 className="login-form__title">Login/Register</h2>
        
        {error && (
          <div className="login-form__error">
            {error}
          </div>
        )}
        
        <form className="login-form__form" onSubmit={handleSubmit}>
          <div className="login-form__input-group">
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Login"
              className="login-form__input"
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="login-form__input"
              disabled={loading}
            />
          </div>
          
          <div className="login-form__buttons">
            <button 
              type="submit" 
              className="login-form__button login-form__button--submit"
              disabled={loading || !formData.login || !formData.password}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
            <button 
              type="button" 
              className="login-form__button login-form__button--secondary"
              onClick={handleRegister}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;