import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './patientcss/PatientProfile.css'

export default function PatientProfile() {
  const [patient, setPatient] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedPatient = sessionStorage.getItem('patient')
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient))
    }
  }, [])

  if (!patient) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading profile...
      </div>
    )
  }

  return (
    <div className="patient-profile-container">
      {/* Header */}
      <div className="patient-profile-header">
        <div className="patient-profile-avatar">
          {patient.name ? patient.name.charAt(0).toUpperCase() : 'P'}
        </div>
        <div className="patient-profile-info-header">
          <h1 className="patient-profile-heading">My Profile</h1>
          <p className="patient-profile-subtitle">
            Welcome back, {patient.name}. 
          </p>
        </div>
      </div>

      {/* Profile Cards Grid */}
      <div className="profile-cards-grid">
        {/* Personal Information */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h3>👤 Personal Information</h3>
            <span className="card-badge">Essential Details</span>
          </div>
          <div className="profile-card-content">
            <div className="profile-field">
              <div className="profile-field-icon">👤</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Full Name</span>
                <span className="profile-field-value">{patient.name}</span>
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field-icon">⚥</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Gender</span>
                <span className="profile-field-value">{patient.gender}</span>
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field-icon">🎂</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Date of Birth</span>
                <span className="profile-field-value">{patient.dob}</span>
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field-icon">👤</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Username</span>
                <span className="profile-field-value">{patient.username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h3>📞 Contact Information</h3>
            <span className="card-badge">Communication</span>
          </div>
          <div className="profile-card-content">
            <div className="profile-field">
              <div className="profile-field-icon">📧</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Email Address</span>
                <span className="profile-field-value">{patient.email}</span>
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field-icon">📱</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Mobile Number</span>
                <span className="profile-field-value">{patient.mobileno}</span>
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field-icon">📍</div>
              <div className="profile-field-content">
                <span className="profile-field-label">Location</span>
                <span className="profile-field-value">{patient.location}</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Actions */}
      <div className="profile-actions">
        <button
          className="profile-update-btn primary"
          onClick={() => navigate('/patient/update')}
        >
          <span className="btn-icon">✏️</span>
          Update Profile
        </button>
        <button
          className="profile-update-btn secondary"
          onClick={() => navigate('/patient/dashboard')}
        >
          <span className="btn-icon">🏠</span>
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

