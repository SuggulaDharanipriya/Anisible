import { useState, useEffect } from "react";
import "./doctorcss/DoctorProfile.css";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = sessionStorage.getItem("doctor");
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    }
  }, []);

  if (!doctor) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading profile...
      </div>
    );
  }

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="doctor-profile-container">
      {/* Header with photo or initials */}
      <div className="doctor-profile-header">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt="Doctor"
            className="doctor-profile-image"
          />
        ) : (
          <div className="doctor-avatar">{getInitials(doctor.name)}</div>
        )}

        <div>
          <h2 className="doctor-name">Dr. {doctor.name}</h2>
          <p className="doctor-specialization">{doctor.specialization}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="doctor-profile-details">
        <div className="detail-item">
          <span className="detail-label">Gender</span>
          <span className="detail-value">{doctor.gender}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date of Birth</span>
          <span className="detail-value">{doctor.dob}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{doctor.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Username</span>
          <span className="detail-value">{doctor.username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Mobile No</span>
          <span className="detail-value">{doctor.mobileno}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Qualification</span>
          <span className="detail-value">{doctor.qualification}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Experience</span>
          <span className="detail-value">{doctor.experience} years</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Location</span>
          <span className="detail-value">{doctor.location}</span>
        </div>
      </div>
    </div>
  );
}
