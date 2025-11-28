package com.klef.sdp.backend.dto;

public class AppointmentDTO {
    private Integer patientId;
    private Integer doctorId;
    private String date;
    private String timeRange;
    private String reason;

    // Getters & Setters
    public Integer getPatientId() { return patientId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }

    public Integer getDoctorId() { return doctorId; }
    public void setDoctorId(Integer doctorId) { this.doctorId = doctorId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTimeRange() { return timeRange; }
    public void setTimeRange(String timeRange) { this.timeRange = timeRange; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
