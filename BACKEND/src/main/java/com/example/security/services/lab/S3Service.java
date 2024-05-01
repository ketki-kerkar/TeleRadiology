package com.example.security.services.lab;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.example.security.Model.Actors.Lab;
import com.example.security.Model.Case;
import com.example.security.Model.Prescription;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.LabRepo;
import com.example.security.Repositories.PrescriptionRepo;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Service
@Log4j
public class S3Service {
    @Autowired
    private PrescriptionRepo prescriptionRepo;

    @Autowired
    private CaseRepo caseRepo;

    @Autowired
    private LabRepo labRepo;
    private AmazonS3 s3client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public S3Service(AmazonS3 s3client) {
        this.s3client = s3client;
    }

    public void uploadFile(String keyName, MultipartFile file) throws IOException {
        var putObjectResult = s3client.putObject(bucketName, keyName, file.getInputStream(), null);
    }
    public void uploadDicomFile(String folderName, String fileName, MultipartFile file) throws IOException {
        // Obtain the input stream from the MultipartFile
        try (InputStream inputStream = file.getInputStream()) {
            // Construct the full object key with the folder path and file name
            String keyName = folderName + "/" + fileName;

            // Upload the file to S3
            s3client.putObject(bucketName, keyName, inputStream, null);
        }
    }
    public S3Object getFile(String keyName) {
        return s3client.getObject(bucketName, keyName);
    }

    public void StoreAwsUrlInCaesTable(Long prescriptionId,String LabEmail,String fileName){
        Optional<Lab> optionalLab=labRepo.findByLabEmail(LabEmail);
        if (optionalLab.isPresent()){
            Lab lab=optionalLab.get();
            //System.out.println(lab.getLabName());
            Optional<Prescription> prescriptionOptional=prescriptionRepo.findById(prescriptionId);
            if(prescriptionOptional.isPresent()){

                Prescription prescription=prescriptionOptional.get();
                //System.out.println(prescription.getPrescriptionTests());
                prescription.setLab(lab);
                prescriptionRepo.save(prescription);
                Case case1=prescription.getCases();
                //  System.out.println(case1.getCaseSummary());
                case1.setAwsUrl("https://had2024.s3.eu-north-1.amazonaws.com/"+fileName);
                caseRepo.save(case1);
            }

        }else{
            System.out.println("Lab not found");
        }

    }
}
