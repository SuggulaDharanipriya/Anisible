import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './patientcss/UpdateProfile.css';

const API_URL = `${import.meta.env.VITE_API_URL}/patient`;

export default function PatientUpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatient = sessionStorage.getItem('patient');
    if (storedPatient) {
      setFormData(JSON.parse(storedPatient));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ updated to use API_URL from .env
      const response = await axios.put(`${API_URL}/updateprofile`, formData);

      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('patient', JSON.stringify(formData));
        setTimeout(() => navigate('/patient/profile'), 1000);
      }
    } catch (error) {
      setMessage('');
      setError(error.response ? error.response.data : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="patient-update-container">
      <h3 className="patient-update-heading">Update Profile</h3>
      {message ? (
        <p className="success-message">{message}</p>
      ) : (
        <p className="error-message">{error}</p>
      )}

      <form className="patient-update-form" onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gender</label>
          <input
            type="text"
            id="gender"
            value={formData.gender}
            readOnly
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            readOnly
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            readOnly
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mobile No</label>
          <input
            type="number"
            id="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="update-profile-btn">Update</button>
      </form>
    </div>
  );
}
