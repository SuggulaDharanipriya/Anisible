import { useState } from "react";
import axios from "axios";
import "./admincss/AddDoctor.css";
const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    specialization: "",
    qualification: "",
    experience: "",
    location: ""   // ✅ added
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ API call
      const response = await axios.post(`${API_URL}/adddoctor`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError("");
        // Reset form
        setFormData({
          name: "",
          gender: "",
          dob: "",
          email: "",
          username: "",
          password: "",
          mobileno: "",
          specialization: "",
          qualification: "",
          experience: "",
          location: ""
        });
      }
    } catch (error) {
      setMessage("");
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
        Add Doctor
      </h3>

      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>
          {message}
        </p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
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
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
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
          <label>Specialization</label>
          <input
            type="text"
            id="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            placeholder="e.g., Cardiology, Neurology"
          />
        </div>

        <div>
          <label>Qualification</label>
          <input
            type="text"
            id="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            placeholder="e.g., MBBS, MD, FMAS"
          />
        </div>

        <div>
          <label>Experience (Years)</label>
          <input
            type="number"
            id="experience"
            value={formData.experience}
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
            placeholder="e.g., Apollo Hospital, Hyderabad"
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
