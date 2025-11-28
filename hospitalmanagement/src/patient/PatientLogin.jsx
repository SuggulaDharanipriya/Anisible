import { useState } from 'react';
import "./patientcss/PatientLogin.css";  
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';


const API_URL = `${import.meta.env.VITE_API_URL}/patient`;

export default function PatientLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsPatientLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Use .env URL
      const response = await axios.post(`${API_URL}/checklogin`, formData);
      if (response.status === 200) {
        setIsPatientLoggedIn(true);
        sessionStorage.setItem('patient', JSON.stringify(response.data));
        navigate('/patient/dashboard'); 
      } else {
        setMessage(response.data);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>
          <span className="signin-text">SignIn</span>
        </h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="options">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="signin-button">Sign In</button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/patient/registration">SignUp</Link>
        </p>
      </div>
    </div>
  );
}
