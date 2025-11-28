import React, { useState, useEffect } from "react";
import axios from "axios";
import "./patientcss/MyAppointment.css";
const API_URL = import.meta.env.VITE_API_URL;


const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null);

  // Get patient ID from sessionStorage
  useEffect(() => {
    const storedPatient = sessionStorage.getItem('patient');
    if (storedPatient) {
      const patient = JSON.parse(storedPatient);
      setPatientId(patient.id);
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      axios
        .get(`${API_URL}/appointments/patient/${patientId}`)
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  }, [patientId]);

  return (
    <div className="my-appointment-container">
      <h2 className="appointment-heading">My Appointments</h2>
      
      {appointments.length === 0 ? (
        <div className="no-appointments">
          <p>No appointments found.</p>
        </div>
      ) : (
        <div className="appointments-table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time Range</th>
                <th>Confirmed Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.doctorName}</td>
                  <td>{appt.date}</td>
                  <td>{appt.timeRange}</td>
                  <td>{appt.confirmedTime || "-"}</td>
                  <td>{appt.reason}</td>
                  <td>
                    <span className={`status-badge status-${appt.status.toLowerCase()}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td>{appt.doctorFeedback || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
