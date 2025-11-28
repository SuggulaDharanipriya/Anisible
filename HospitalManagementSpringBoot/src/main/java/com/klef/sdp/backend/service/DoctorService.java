package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Doctor;
import java.util.List;

public interface DoctorService 
{
    public String doctorRegistration(Doctor doctor);
    public Doctor checkDoctorLogin(String username, String password);
    public Doctor getDoctorById(int id);
    public String updateDoctorProfile(Doctor doctor);

    public List<Doctor> getAllDoctors(); 
}
