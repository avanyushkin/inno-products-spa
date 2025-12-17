import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.scss';

function LoginForm() {
  const [formData, setFormData] = useState({
    login : "",
    password : ""
  });

  const navigate = useNavigate();

  if (formData.login && formData.password) { // if correct - navigate
    navigate("/home");
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleRegister = (e) => {
    console.log('Registration...');
    // navigate("/register");
  }

  return (
    <>
      <div className="login-form">
        <div className="login-form__container">
        <h2 className="login-form__title">Login/Register</h2>
        <form className="login-form__form" onSubmit={handleSubmit}>
          <div className="input-columns">
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Login"
              className="login-form__input"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="login-form__input"
            />
          </div>
          <div className="login-form__buttons">
            <button type="submit" className="login-form__button login-form__button--submit">
              Login
            </button>
            <button type="button" className="login-form__button login-form__button--secondary"
            onClick={handleRegister}>
                Register
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;