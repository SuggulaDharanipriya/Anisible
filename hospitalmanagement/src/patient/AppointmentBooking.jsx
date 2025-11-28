import React, { useState, useEffect } from "react";
import axios from "axios";
import "./patientcss/AppointmentBooking.css";
const API_URL = import.meta.env.VITE_API_URL;


const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    timeRange: "",
    reason: "",
  });

  // Get patient ID from sessionStorage
  useEffect(() => {
    const storedPatient = sessionStorage.getItem('patient');
    if (storedPatient) {
      const patient = JSON.parse(storedPatient);
      setFormData(prev => ({
        ...prev,
        patientId: patient.id
      }));
    }
  }, []);

  // ✅ Fetch doctors (ensure correct id + name mapping)
  useEffect(() => {
    axios
      .get(`${API_URL}/doctor/all`)
      .then((res) => {
        console.log("Doctors fetched:", res.data);
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setMessage("");
    setError("");
    
    // Validate data before sending
    if (!formData.patientId || formData.patientId <= 0) {
      setError("Invalid patient ID. Please login again.");
      return;
    }
    
    if (!formData.doctorId || formData.doctorId <= 0) {
      setError("Please select a doctor.");
      return;
    }

    if (!formData.date) {
      setError("Please select a date.");
      return;
    }

    if (!formData.timeRange) {
      setError("Please select a time range.");
      return;
    }

    if (!formData.reason.trim()) {
      setError("Please enter a reason for the appointment.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/appointments/book`, formData);
      console.log("Success response:", response.data);
      setMessage("Appointment booked successfully!");
      setFormData({
        patientId: formData.patientId, // keep patientId same
        doctorId: "",
        date: "",
        timeRange: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || "Failed to book appointment";
      setError(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-heading">Book Appointment</h2>
      
      {/* Message Cards */}
      {message && (
        <div className="message-card success-card">
          <div className="message-icon">✅</div>
          <div className="message-content">
            <h4>Success!</h4>
            <p>{message}</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="message-card error-card">
          <div className="message-icon">❌</div>
          <div className="message-content">
            <h4>Error</h4>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <form className="appointment-form" onSubmit={handleSubmit}>
        {/* Doctor Dropdown */}
        <div className="form-group">
          <label>Doctor</label>
          <select
            id="doctorId"
            value={formData.doctorId || ""}
            onChange={(e) =>
              setFormData({ ...formData, doctorId: e.target.value ? Number(e.target.value) : "" }) // ✅ ensure integer with fallback
            }
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id || doc.doctorId} value={doc.id || doc.doctorId}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time Range */}
        <div className="form-group">
          <label>Time Range</label>
          <select
            id="timeRange"
            value={formData.timeRange}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Time Range --</option>
            <option key="9AM-12PM" value="9AM-12PM">9 AM - 12 PM</option>
            <option key="12PM-3PM" value="12PM-3PM">12 PM - 3 PM</option>
            <option key="3PM-6PM" value="3PM-6PM">3 PM - 6 PM</option>
            <option key="6PM-9PM" value="6PM-9PM">6 PM - 9 PM</option>
          </select>
        </div>

        {/* Reason */}
        <div className="form-group">
          <label>Reason</label>
          <textarea
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter reason for appointment"
            required
          />
        </div>

        <button type="submit" className="appointment-btn">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
