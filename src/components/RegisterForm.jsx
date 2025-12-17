import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.scss';

function RegisterForm() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don`t match");
      return;
    }
    
    navigate('/login');
  }

  return (
    <div className="register-form">
      <div className="register-form__container">
        <h2 className="register-form__title">Register</h2>
        <form className="register-form__form" onSubmit={handleSubmit}>
          <div className="input-columns__register">
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Login"
              className="register-form__input"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New password"
              className="register-form__input"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="register-form__input"
            />
          </div>
          <div className="register-form__button">
            <button 
              type="submit" 
              className="register-form__button register-form__button--submit"
            >
              Register
            </button>
          </div>
        </form>
        
        <div className="register-form__back-button">
          <button onClick={() => navigate('/login')}>
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;