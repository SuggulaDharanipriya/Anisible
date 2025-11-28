package com.klef.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.sdp.backend.model.Patient;
import com.klef.sdp.backend.service.PatientService;

@RestController
@RequestMapping("/patient")
@CrossOrigin("*")
public class PatientController 
{
    @Autowired
    private PatientService patientService;

    @GetMapping("/")
    public String home() {
        return "Patient Module Running Successfully";
    }

    @PostMapping("/registration")
    public ResponseEntity<String> patientRegistration(@RequestBody Patient patient) {
        try {
            String output = patientService.patientRegistration(patient);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Patient Registration failed");
        }
    }

    @PostMapping("/checklogin")
    public ResponseEntity<?> checkPatientLogin(@RequestBody Patient patient) {
        try {
            Patient p = patientService.checkPatientLogin(patient.getUsername(), patient.getPassword());
            if (p != null) {
                return ResponseEntity.ok(p);
            } else {
                return ResponseEntity.status(401).body("Invalid Username or Password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @PutMapping("/updateprofile")
    public ResponseEntity<String> updateProfile(@RequestBody Patient patient) {
        try {
            String output = patientService.patientUpdateProfile(patient);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Update Patient ... !!");
        }
    }
}
