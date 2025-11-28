package com.klef.sdp.backend.service;

import com.klef.sdp.backend.model.Patient;

public interface PatientService 
{
    public String patientRegistration(Patient patient);
    public Patient checkPatientLogin(String username, String password);
    public String patientUpdateProfile(Patient patient);
}
