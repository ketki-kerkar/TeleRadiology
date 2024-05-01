package com.example.security.auth;

import com.example.security.DTOs.AnnotatedImagesDTO;
import com.example.security.DTOs.InvitationDTO;
import com.example.security.DTOs.Requests.AcceptInvRequest;
import com.example.security.DTOs.Requests.AnnotatedImageRequest;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.services.radiologist.AcceptingInvitationService;
import com.example.security.services.radiologist.AnnotatedImageService;
import com.example.security.services.radiologist.ListingInvitations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/radiologist")
public class RadiologistController {

    @Autowired
    private AcceptingInvitationService acceptingInvitationService;

    @Autowired
    private ListingInvitations listingInvitations;

    @PostMapping("/accept-invitation")
    public ResponseEntity<String> acceptInvitation(@RequestBody AcceptInvRequest acceptInvRequest) {
        try {
            acceptingInvitationService.acceptInvitation(acceptInvRequest);
            return ResponseEntity.ok("Invitation accepted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/list")
    public ResponseEntity<List<InvitationDTO>> listInvitations(@RequestBody EmailRequest emailRequest) {
        String receiverEmail = emailRequest.getEmail();
        List<InvitationDTO> invitations = listingInvitations.getInvitationsByReceiverEmail(receiverEmail);
        return ResponseEntity.ok(invitations);
    }

    @Autowired
    private AnnotatedImageService annotatedImageService;
    private static final Logger logger = LoggerFactory.getLogger(RadiologistController.class);
    @PostMapping("/upload-image-annotated")
    public ResponseEntity<String> uploadAnnotatedImage(@RequestBody AnnotatedImageRequest request){
        //logger.info("Received request to upload Annotated Image: {}", request.getAnnotatedImageBase64());
        //System.out.println(request.getAnnotatedImageBase64());
        annotatedImageService.uploadAnnotations(request);
        //logger.info("Uploaded annotated Images  successfully");
        return new ResponseEntity<>("Uploaded annotated Images successfully", HttpStatus.OK);
    }


    @GetMapping("/get-list-of-annotatedimages")
    public List<AnnotatedImagesDTO> getListOfAnnotatedImages(@RequestParam Long caseId){
        //  List<AnnotatedImagesDTO> listOfannotatedImages=annotatedImageService.getListofAnnotatedImages(caseId);
        // return listOfannotatedImages;
        return annotatedImageService.getListOfAnnotatedImagesDTOByCaseId(caseId);
    }
}
