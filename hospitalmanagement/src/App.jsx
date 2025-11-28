import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

// NavBars
import MainNavBar from "./main/MainNavBar";
import PatientNavBar from "./patient/PatientNavBar";
import DoctorNavBar from "./doctor/DoctorNavBar";
import AdminNavBar from "./admin/AdminNavBar";

function AppContent() {
  const { isAdminLoggedIn, isDoctorLoggedIn, isPatientLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isDoctorLoggedIn ? (
        <DoctorNavBar />
      ) : isPatientLoggedIn ? (
        <PatientNavBar />
      ) : (
        <MainNavBar />
      )}
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
