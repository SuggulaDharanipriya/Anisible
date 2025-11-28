package com.klef.sdp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.sdp.backend.model.Patient;
import com.klef.sdp.backend.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService
{
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public String patientRegistration(Patient patient) {
        patientRepository.save(patient);
        return "Patient Registered Successfully";
    }

    @Override
    public Patient checkPatientLogin(String username, String password) {
        return patientRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public String patientUpdateProfile(Patient patient) {
        Patient existing = patientRepository.findById(patient.getId()).orElse(null);

        if (existing != null) {
            existing.setName(patient.getName());
            existing.setDob(patient.getDob());
            existing.setEmail(patient.getEmail());
            existing.setMobileno(patient.getMobileno());
            existing.setPassword(patient.getPassword());
            existing.setLocation(patient.getLocation());
            patientRepository.save(existing);
            return "Patient Profile Updated Successfully";
        } else {
            return "Patient ID Not Found to Update";
        }
    }
}
