package com.klef.sdp.backend.controller;

import com.klef.sdp.backend.model.Admin;
import com.klef.sdp.backend.model.Doctor;
import com.klef.sdp.backend.model.Patient;
import com.klef.sdp.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController
{
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> checkAdminLogin(@RequestBody Admin admin) {
        Admin a = adminService.checkAdminLogin(admin.getUsername(), admin.getPassword());
        if (a != null) {
            return ResponseEntity.ok(a);
        } else {
            return ResponseEntity.status(401).body("Invalid Username or Password");
        }
    }

    @PostMapping("/adddoctor")
    public ResponseEntity<String> addDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(adminService.addDoctor(doctor));
    }

    @GetMapping("/alldoctors")
    public ResponseEntity<List<Doctor>> displayDoctors() {
        return ResponseEntity.ok(adminService.displayDoctors());
    }

    @DeleteMapping("/deletedoctor/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable int id) {
        return ResponseEntity.ok(adminService.deleteDoctor(id));
    }

    @GetMapping("/doctorcount")
    public ResponseEntity<Long> doctorCount() {
        return ResponseEntity.ok(adminService.displayDoctorCount());
    }

    @GetMapping("/allpatients")
    public ResponseEntity<List<Patient>> displayPatients() {
        return ResponseEntity.ok(adminService.displayPatients());
    }

    @DeleteMapping("/deletepatient/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable int id) {
        return ResponseEntity.ok(adminService.deletePatient(id));
    }

    @GetMapping("/patientcount")
    public ResponseEntity<Long> patientCount() {
        return ResponseEntity.ok(adminService.displayPatientCount());
    }
}
