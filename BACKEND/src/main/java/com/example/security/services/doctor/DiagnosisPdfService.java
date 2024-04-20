package com.example.security.services.doctor;

import com.example.security.DTOs.Requests.DiagnosisRequest;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Case;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.DoctorRepo;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Service
public class DiagnosisPdfService {

    //Since the PDF content is stored in a ByteArrayOutputStream, the natural choice for returning it is a ByteArrayInputStream
    //ByteArrayInputStream provides a way to stream the PDF content from memory.
    // This is useful when the caller needs to read the PDF content, for example, to send it over a network connection, save it to a database, or serve it as a response in a web application.
    @Autowired
    private CaseRepo caseRepo;

    @Autowired
    private DoctorRepo doctorRepo;


    public ByteArrayInputStream getDiagnosis(Long CaseId) throws IOException {
        Optional<Case> caseOptional=caseRepo.findById(CaseId);
        Case caseObj=caseOptional.get();
        String base64EncodedString =caseObj.getDiagnosisReportBase64();
        // Decode the Base64 string to byte array
        byte[] decodedBytes = Base64.getDecoder().decode(base64EncodedString);

        // Create a ByteArrayInputStream using the byte array
        ByteArrayInputStream inputStream = new ByteArrayInputStream(decodedBytes );
        return inputStream;

    }


    public ByteArrayInputStream createDiagnosisPdf(DiagnosisRequest request){

        Optional<Case> caseOptional=caseRepo.findById(request.getCaseId());
        Case caseObj=caseOptional.get();

        Doctor doctor=caseObj.getDoctor();
        Patient patient=caseObj.getPatient();
        HospitalHandle hospitalHandle=doctor.getHospital();
        //ByteArrayOutputStream is used to write data to a byte array. It's particularly useful when you need to write data to an in-memory byte array rather than a file or another output stream.
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        String hospitalName=hospitalHandle.getHospitalName();
        String PatientName=patient.getName();
        String PatientAge=String.valueOf(patient.getAge());;
        String PatientSex=patient.getGender();
        String Part= request.getPart();
        String DoctorName= doctor.getDName();
        String DoctorDegree= doctor.getQualification();
        String Findings = request.getFindings();

        String  Techniques= request.getTechniques();

        String Impressions= request.getImpression();

        LocalDate today = LocalDate.now();
        String todayDate=today.toString();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date caseRegdate=caseObj.getCaseRegistrationDate();
        String registrationDate=dateFormat.format(caseRegdate);


        //This is a class provided by the iTextPDF library. It's used for creating and manipulating PDF documents programmatically.
        Document document = new Document();

        try {
            // PdfWriter.getInstance() is used to create a PdfWriter instance to write PDF content to a specified OutputStream.
            // Here, we're creating a PdfWriter that will write to the ByteArrayOutputStream 'out', which allows us to store the PDF content in memory.
            PdfWriter.getInstance(document, out);

            document.open();




            // Define all fonts
            Font fontHospitalName = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22);
            Font contentFont = FontFactory.getFont(FontFactory.HELVETICA, 13);
            Font TitleFont=FontFactory.getFont(FontFactory.HELVETICA_BOLD,14);
            Font PatientNameTitleFont=FontFactory.getFont(FontFactory.HELVETICA_BOLD,16);
            Font DateTitleFont=FontFactory.getFont(FontFactory.HELVETICA_BOLD,12);
            Font PatientInfoFont=FontFactory.getFont(FontFactory.HELVETICA,13);
            Font DoctorNameFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 13);


            // Create a Paragraph instance to hold the hospital name text. Apply the defined font to the paragraph.
            Paragraph HospitalNamePara = new Paragraph(hospitalName, fontHospitalName);
            //Set alignment for HospitalNamePara
            HospitalNamePara.setAlignment(Element.ALIGN_CENTER);
            // Add the HospitalNamePara to the PDF document.
            document.add(HospitalNamePara);
            document.add(Chunk.NEWLINE);

            // Create a table for patient name and registration date
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            // Add patient name
            PdfPCell patientCell = new PdfPCell();
            Paragraph PatientAgePara=new Paragraph("Age: "+ PatientAge ,PatientInfoFont);
            Paragraph PatientGenderPara=new Paragraph("Sex: "+ PatientSex ,PatientInfoFont);
            Paragraph PatientNamedata=new Paragraph(PatientName,PatientNameTitleFont);
            patientCell.addElement(PatientNamedata);
            patientCell.addElement(PatientAgePara);
            patientCell.addElement(PatientGenderPara);
            patientCell.setBorder(Rectangle.NO_BORDER);
            table.addCell(patientCell);

            // Add registration date
            PdfPCell dateCell = new PdfPCell();
            Paragraph DiagnosisDateTitle=new Paragraph("Diagnosis Report Date ",DateTitleFont);
            Paragraph DiagnosisDatedata=new Paragraph(todayDate,contentFont);
            Paragraph CaseRegDateTitle=new Paragraph("Case Registration Date ",DateTitleFont);
            Paragraph CaseRegDatedata=new Paragraph(registrationDate,contentFont);
            dateCell.addElement(CaseRegDateTitle);
            dateCell.addElement(CaseRegDatedata);
            dateCell.addElement(DiagnosisDateTitle);
            dateCell.addElement(DiagnosisDatedata);
            dateCell.setBorder(Rectangle.NO_BORDER);
            dateCell.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
            dateCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(dateCell);

            document.add(table);
            document.add(Chunk.NEWLINE);


            //Part
            Paragraph PartTitlePara = new Paragraph("Part :" ,TitleFont );
            PartTitlePara.setAlignment(Element.ALIGN_LEFT);
            document.add(PartTitlePara);
            Paragraph PartDataPara = new Paragraph(Part ,contentFont );
            PartDataPara.setAlignment(Element.ALIGN_LEFT);
            document.add(PartDataPara);
            document.add(Chunk.NEWLINE);

            //Technique
            Paragraph TechniqueTitle = new Paragraph("Technique",TitleFont);
            document.add(TechniqueTitle);
            Paragraph TechniquePara = new Paragraph();
            TechniquePara.setAlignment(Element.ALIGN_LEFT);
            TechniquePara.add(Techniques);
            document.add(TechniquePara);
            document.add(Chunk.NEWLINE);

            //Findings
            Paragraph FindingsTitle = new Paragraph("Findings",TitleFont);
            document.add(FindingsTitle);
            Paragraph FindingsPara = new Paragraph();
            FindingsPara.setAlignment(Element.ALIGN_LEFT);
            String[] lines = Findings.split("\n");
            for (String line : lines) {
                // Add bullet point
                Chunk bullet = new Chunk("\u2022 ");
                FindingsPara.add(bullet);

                // Add text of the line
                FindingsPara.add(new Chunk(line, contentFont));

                // Add newline after each line
                FindingsPara.add(Chunk.NEWLINE);
            }
            document.add(FindingsPara);
            document.add(Chunk.NEWLINE);

            //Impressions
            Paragraph ImpressionsTitle = new Paragraph("Impressions",TitleFont);
            document.add(ImpressionsTitle);
            Paragraph ImpressionsPara = new Paragraph();
            ImpressionsPara.setAlignment(Element.ALIGN_LEFT);
            String[] lines1 = Impressions.split("\n");
            for (String line : lines1) {
                // Add bullet point
                Chunk bullet = new Chunk("\u2022 ");
                ImpressionsPara.add(bullet);

                // Add text of the line
                ImpressionsPara.add(new Chunk(line, contentFont));

                // Add newline after each line
                ImpressionsPara.add(Chunk.NEWLINE);
            }
            document.add(Chunk.NEWLINE);document.add(ImpressionsPara);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);

            //DoctorName
            Paragraph DoctorNamePara = new Paragraph("Dr. "+ DoctorName, DoctorNameFont );
            DoctorNamePara.setAlignment(Element.ALIGN_LEFT);
            document.add(DoctorNamePara);

            //DoctorDegree
            Paragraph DoctorDegreePara = new Paragraph("( "+ DoctorDegree + " ) ", contentFont );
            DoctorNamePara.setAlignment(Element.ALIGN_LEFT);
            document.add(DoctorDegreePara);

            // Close the PDF document. This finalizes the document and ensures that all content is properly written and resources are released.
            // It's important to close the document after finishing adding content to ensure the PDF is complete and valid.
            document.close();

            byte[] byteArrayDiagnosis = out.toByteArray();
            String encodedString = Base64.getEncoder().encodeToString(byteArrayDiagnosis);

            caseObj.setDiagnosisReportBase64(encodedString);
            caseRepo.save(caseObj);

            // Convert the content written to the ByteArrayOutputStream 'out' into a byte array using toByteArray() method.
            // Then, create a new ByteArrayInputStream using the byte array.
            return new ByteArrayInputStream(out.toByteArray());
          } catch (DocumentException e) {

            throw new RuntimeException(e);

        }



    }


}

