package com.klef.sdp.backend.service;

import com.klef.sdp.backend.dto.AppointmentDTO;
import com.klef.sdp.backend.model.Appointment;
import com.klef.sdp.backend.model.Doctor;
import com.klef.sdp.backend.model.Patient;
import com.klef.sdp.backend.repository.AppointmentRepository;
import com.klef.sdp.backend.repository.DoctorRepository;
import com.klef.sdp.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Appointment bookAppointment(AppointmentDTO dto) {
        // Debug logging
        System.out.println("Received patientId: " + dto.getPatientId());
        System.out.println("Received doctorId: " + dto.getDoctorId());
        
        // Check if patientId is valid
        if (dto.getPatientId() == null || dto.getPatientId() <= 0) {
            throw new RuntimeException("Invalid patientId: " + dto.getPatientId());
        }
        
        // Check if doctorId is valid
        if (dto.getDoctorId() == null || dto.getDoctorId() <= 0) {
            throw new RuntimeException("Invalid doctorId: " + dto.getDoctorId());
        }

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + dto.getPatientId()));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + dto.getDoctorId()));

        Appointment appointment = new Appointment();
        appointment.setPatientId(patient.getId());
        appointment.setPatientName(patient.getName());
        appointment.setPatientContact(patient.getMobileno());

        appointment.setDoctorId(doctor.getId());
        appointment.setDoctorName(doctor.getName());

        appointment.setDate(dto.getDate());
        appointment.setTimeRange(dto.getTimeRange());
        appointment.setReason(dto.getReason());
        appointment.setStatus("PENDING");

        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(int doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(int patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public Appointment updateStatus(int id, String status, String feedback, String confirmedTime) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);
        appointment.setDoctorFeedback(feedback);
        appointment.setConfirmedTime(confirmedTime);

        return appointmentRepository.save(appointment);
    }
}