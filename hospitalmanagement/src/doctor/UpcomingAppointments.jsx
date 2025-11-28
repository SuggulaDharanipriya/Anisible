import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import "./doctorcss/UpcomingAppointments.css";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  // Get doctor ID from sessionStorage
  useEffect(() => {
    const storedDoctor = sessionStorage.getItem('doctor');
    if (storedDoctor) {
      const doctor = JSON.parse(storedDoctor);
      setDoctorId(doctor.id);
    }
  }, []);

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`${API_URL}/appointments/doctor/${doctorId}`)
        .then((res) => {
          // Filter only approved appointments and sort by confirmed time
          const approvedAppointments = res.data
            .filter(appt => appt.status === "APPROVED" && appt.confirmedTime)
            .sort((a, b) => {
              // Sort by date first, then by confirmed time
              if (a.date !== b.date) {
                return new Date(a.date) - new Date(b.date);
              }
              return a.confirmedTime.localeCompare(b.confirmedTime);
            });
          setAppointments(approvedAppointments);
        })
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  }, [doctorId]);

  const formatTime = (timeStr) => {
    // Convert time string to readable format
    return timeStr || "-";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="upcoming-appointments-container">
      <h2 className="appointment-heading">Upcoming Appointments</h2>
      
      {appointments.length === 0 ? (
        <div className="no-appointments">
          <div className="no-appointments-icon">📅</div>
          <p>No upcoming appointments scheduled.</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <div className="appointment-header">
                <div className="patient-info">
                  <h3 className="patient-name">{appt.patientName}</h3>
                  <p className="patient-contact">📞 {appt.patientContact}</p>
                </div>
                <div className="appointment-status">
                  <span className="status-badge status-approved">Approved</span>
                </div>
              </div>
              
              <div className="appointment-details">
                <div className="detail-item">
                  <span className="detail-label">📅 Date:</span>
                  <span className="detail-value">{formatDate(appt.date)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">🕐 Time:</span>
                  <span className="detail-value">{formatTime(appt.confirmedTime)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">⏰ Time Range:</span>
                  <span className="detail-value">{appt.timeRange}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">📝 Reason:</span>
                  <span className="detail-value">{appt.reason}</span>
                </div>
                
                {appt.doctorFeedback && (
                  <div className="detail-item">
                    <span className="detail-label">💬 Feedback:</span>
                    <span className="detail-value">{appt.doctorFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
