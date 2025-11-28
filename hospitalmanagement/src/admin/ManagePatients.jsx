import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./admincss/ManagePatients.css";
const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch patients
  const displayPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/allpatients`);
      setPatients(response.data);
    } catch (err) {
      setError("Failed to fetch patients... " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayPatients();
  }, []);

  // Delete patient
  const deletePatient = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/deletepatient/${id}`
      );
      setError(""); // Clear any previous errors
      displayPatients();
      // Success is handled by refreshing the list
    } catch (err) {
      setError("Unexpected error... " + err.message);
    }
  };

  // ✅ Filter patients by search + gender
  const filteredPatients = patients.filter((p) => {
    const query = search.toLowerCase();

    const matchesSearch =
      p.name?.toLowerCase().includes(query) ||
      p.email?.toLowerCase().includes(query) ||
      p.username?.toLowerCase().includes(query) ||
      p.mobileno?.toLowerCase().includes(query) ||
      p.location?.toLowerCase().includes(query);

    const matchesGender =
      genderFilter === "All" || p.gender?.toLowerCase() === genderFilter.toLowerCase();

    return matchesSearch && matchesGender;
  });

  return (
    <div className="patient-container">
      <h2 className="patient-title">Manage Patients</h2>

      {/* 🔍 Filters */}
      <div className="filters">
        <input
          placeholder="🔍 Search by name, email, username, mobile, location"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      {/* Table Rendering */}
      {error ? (
        <div className="table-error">{error}</div>
      ) : loading ? (
        <div className="table-loading">Loading patients...</div>
      ) : filteredPatients.length === 0 ? (
        <div className="table-empty">No Patient Data Found</div>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Username</th>
              <th>Mobile No</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>{patient.email}</td>
                <td>{patient.username}</td>
                <td>{patient.mobileno}</td>
                <td>{patient.location}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deletePatient(patient.id)}
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
