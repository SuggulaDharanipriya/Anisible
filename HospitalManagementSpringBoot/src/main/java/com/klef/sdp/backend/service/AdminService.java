package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Admin;
import com.klef.sdp.backend.model.Doctor;
import com.klef.sdp.backend.model.Patient;

import java.util.List;

public interface AdminService
{
    public Admin checkAdminLogin(String username, String password);

    // Doctor operations
    public String addDoctor(Doctor doctor);
    public List<Doctor> displayDoctors();
    public String deleteDoctor(int id);
    public long displayDoctorCount();

    // Patient operations
    public List<Patient> displayPatients();
    public String deletePatient(int id);
    public long displayPatientCount();
}
