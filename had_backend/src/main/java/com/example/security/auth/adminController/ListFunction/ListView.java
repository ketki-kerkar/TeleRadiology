
package com.example.security.auth.adminController.ListFunction;

import com.example.security.services.admin.ListUser;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/viewList")
public class ListView {

    @Autowired
    private  ListUser listUser ;


    @GetMapping("/ofHospitals")
    public ResponseEntity<List<HospitalHandleDTO>> getAllHospitalHandles() {
        List<HospitalHandleDTO> hospitalHandleDTOs = listUser.getAllHospitalHandles()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hospitalHandleDTOs);
    }
    private HospitalHandleDTO convertToDTO(HospitalHandle hospitalHandle) {
        HospitalHandleDTO dto = new HospitalHandleDTO();
        dto.setHospitalName(hospitalHandle.getHospitalName());
        dto.setEmail(hospitalHandle.getUser().getEmail());
        return dto;
    }

    @GetMapping("/ofLabs")
    public ResponseEntity<List<LabDTO>> getAllLab() {
        List<LabDTO> labDTOs = listUser.getAllLab()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(labDTOs);
    }
    private LabDTO convertToDTO(Lab lab) {
        LabDTO dto = new LabDTO();
        dto.setLabName(lab.getLabName());
        dto.setEmail(lab.getUser().getEmail());
        return dto;
    }

    @GetMapping("/ofDoctors")
    public ResponseEntity<List<DoctorDTO>> getAllDoctor() {
        List<DoctorDTO> doctorDTOs = listUser.getAllDoctor()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setDName(doctor.getDName());
        dto.setHospitalName(doctor.getHospital().getHospitalName());
        dto.setEmail(doctor.getUser().getEmail());
        return dto;
    }
}