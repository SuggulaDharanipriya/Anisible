package com.klef.sdp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.klef.sdp.backend.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> 
{
    Patient findByUsernameAndPassword(String username, String password);

    @Query("select count(p) from Patient p")
    long patientCount();
}
