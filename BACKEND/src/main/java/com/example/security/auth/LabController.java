package com.example.security.auth;

import com.example.security.DTOs.PatientDTO;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.DTOs.UserDTO;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Repositories.LabRepo;
import com.example.security.Repositories.UserRepo;
import com.example.security.services.admin.FindUser;
import com.example.security.services.admin.ListUser;
import com.example.security.services.lab.S3Service;
import com.example.security.services.login.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/lab")
public class LabController {

    private final S3Service s3Service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ListUser listUser;




    public LabController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping
    public String health() {
        return "UP";
    }


    @PostMapping(path = "/uploadFile", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public String uploadFile(@RequestPart("jsonFile") MultipartFile jsonFile,
                             @RequestPart("dicomFile") MultipartFile dicomFile,
                             @RequestPart("prescriptionId") String prescriptionId) throws IOException {
        s3Service.uploadFile(jsonFile.getOriginalFilename(), jsonFile);
        s3Service.uploadDicomFile("Cases" , dicomFile.getOriginalFilename(), dicomFile);
        Long presId=Long.parseLong(prescriptionId);
        s3Service.StoreAwsUrlInCaesTable(presId,"anujag78@gmail.com",jsonFile.getOriginalFilename());
        return "File uploaded";
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(s3Service.getFile(fileName).getObjectContent()));
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<InputStreamResource> viewFile(@PathVariable String fileName) {
        var s3Object = s3Service.getFile(fileName);
        var content = s3Object.getObjectContent();
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // This content type can change by your file :)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\""+fileName+"\"")
                .body(new InputStreamResource(content));
    }
    @GetMapping("/viewList/ofPatients")
    public ResponseEntity<List<PatientDTO>> getAllPatient(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"lab".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        List<PatientDTO> patientDTOs = listUser.getAllPatient()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientDTOs);
    }
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setName(patient.getName());
        dto.setEmail(patient.getUser().getEmail());
        return dto;
    }

}