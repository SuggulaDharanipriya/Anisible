package com.klef.sdp.backend.controller;

import com.klef.sdp.backend.dto.AppointmentDTO;
import com.klef.sdp.backend.model.Appointment;
import com.klef.sdp.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody AppointmentDTO dto) {
        return appointmentService.bookAppointment(dto);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable int doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable int patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @PutMapping("/{id}/status")
    public Appointment updateStatus(
            @PathVariable int id,
            @RequestParam String status,
            @RequestParam(required = false) String feedback,
            @RequestParam(required = false) String confirmedTime) {
        return appointmentService.updateStatus(id, status, feedback, confirmedTime);
    }
}
