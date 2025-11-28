import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./admincss/ManageDoctors.css";
const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch doctors
  const displayDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/alldoctors`);
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors... " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayDoctors();
  }, []);

  // Delete doctor
  const deleteDoctor = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/deletedoctor/${id}`
      );
      setError(""); // Clear any previous errors
      displayDoctors();
      // Success is handled by refreshing the list
    } catch (err) {
      setError("Unexpected error... " + err.message);
    }
  };

  // ✅ Filter doctors by search + specialization
  const filteredDoctors = doctors.filter((d) => {
    const query = search.toLowerCase();

    const matchesSearch =
      d.name?.toLowerCase().includes(query) ||
      d.email?.toLowerCase().includes(query) ||
      d.username?.toLowerCase().includes(query) ||
      d.mobileno?.toLowerCase().includes(query) ||
      d.location?.toLowerCase().includes(query) ||
      d.qualification?.toLowerCase().includes(query) ||
      d.specialization?.toLowerCase().includes(query);

    const matchesSpec =
      specializationFilter === "All" ||
      d.specialization?.toLowerCase() === specializationFilter.toLowerCase();

    return matchesSearch && matchesSpec;
  });

  return (
    <div className="doctor-container">
      <h2 className="doctor-title">Manage Doctors</h2>

      {/* 🔍 Filters */}
      <div className="filters">
        <input
          placeholder="🔍 Search by name, email, username, mobile, location"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
        />

        <select
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
        >
          <option>All</option>
          <option>Cardiology</option>
          <option>Dermatology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
          <option>Dentist</option>
        </select>
      </div>

      {/* Table Rendering */}
      {error ? (
        <div className="table-error">{error}</div>
      ) : loading ? (
        <div className="table-loading">Loading doctors...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="table-empty">No Doctor Data Found</div>
      ) : (
        <table className="doctor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
           
              <th>Email</th>
              <th>Username</th>
              <th>Mobile</th>
              <th>Qualification & Specialization</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.gender}</td>
             
                <td>{doctor.email}</td>
                <td>{doctor.username}</td>
                <td>{doctor.mobileno}</td>
                {/* ✅ Merge into one column */}
                <td>
                  {doctor.qualification} ({doctor.specialization})
                </td>
                <td>{doctor.experience} yrs</td>
                <td>{doctor.location}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteDoctor(doctor.id)}
                  >
                    <DeleteIcon /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
