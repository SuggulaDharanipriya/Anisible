import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import "./patientcss/UpcomingAppointments.css";

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get patient data from sessionStorage
  useEffect(() => {
    const storedPatient = sessionStorage.getItem('patient');
    if (storedPatient) {
      const patientData = JSON.parse(storedPatient);
      setPatient(patientData);
    }
  }, []);

  // Fetch upcoming appointments
  useEffect(() => {
    if (patient?.id) {
      axios
        .get(`${API_URL}/appointments/patient/${patient.id}`)
        .then((res) => {
          // Filter upcoming appointments (approved with future dates)
          const upcoming = res.data.filter(appt => 
            appt.status === "APPROVED" && 
            appt.confirmedTime && 
            new Date(appt.date) >= new Date()
          ).sort((a, b) => {
            if (a.date !== b.date) {
              return new Date(a.date) - new Date(b.date);
            }
            return a.confirmedTime.localeCompare(b.confirmedTime);
          });
          
          setAppointments(upcoming);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          setLoading(false);
        });
    }
  }, [patient]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    return timeStr || "-";
  };

  const getTimeUntilAppointment = (dateStr, timeStr) => {
    const appointmentDateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffMs = appointmentDateTime - now;
    
    if (diffMs < 0) return "Past appointment";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} remaining`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} remaining`;
    } else {
      return "Appointment starting soon!";
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading upcoming appointments...</p>
      </div>
    );
  }

  return (
    <div className="upcoming-appointments-page">
      <div className="page-header">
        <h1>📅 Upcoming Appointments</h1>
        <p>Your confirmed appointments and scheduled visits</p>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No Upcoming Appointments</h3>
          <p>You don't have any confirmed appointments scheduled.</p>
          <p>Book an appointment to get started with your healthcare journey.</p>
        </div>
      ) : (
        <div className="appointments-container">
          <div className="appointments-grid">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      {appointment.doctorName ? appointment.doctorName.charAt(0).toUpperCase() : 'D'}
                    </div>
                    <div className="doctor-details">
                      <h3>Dr. {appointment.doctorName}</h3>
                      <p className="appointment-reason">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="appointment-status">
                    <span className="status-badge status-approved">Confirmed</span>
                  </div>
                </div>

                <div className="appointment-details">
                  <div className="detail-item">
                    <div className="detail-icon">📅</div>
                    <div className="detail-content">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">{formatDate(appointment.date)}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">🕐</div>
                    <div className="detail-content">
                      <span className="detail-label">Time</span>
                      <span className="detail-value">{formatTime(appointment.confirmedTime)}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">⏰</div>
                    <div className="detail-content">
                      <span className="detail-label">Time Until</span>
                      <span className="detail-value time-remaining">
                        {getTimeUntilAppointment(appointment.date, appointment.confirmedTime)}
                      </span>
                    </div>
                  </div>

                  {appointment.doctorFeedback && (
                    <div className="detail-item feedback-item">
                      <div className="detail-icon">💬</div>
                      <div className="detail-content">
                        <span className="detail-label">Doctor's Note</span>
                        <span className="detail-value feedback-text">
                          {appointment.doctorFeedback}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="appointment-actions">
                  <button className="action-btn primary">
                    <span className="btn-icon">📞</span>
                    Contact Doctor
                  </button>
                  <button className="action-btn secondary">
                    <span className="btn-icon">📍</span>
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="appointments-summary">
            <div className="summary-card">
              <h3>📊 Summary</h3>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">Total Upcoming:</span>
                  <span className="summary-value">{appointments.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">This Week:</span>
                  <span className="summary-value">
                    {appointments.filter(appt => {
                      const appointmentDate = new Date(appt.date);
                      const today = new Date();
                      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                      return appointmentDate >= today && appointmentDate <= weekFromNow;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
