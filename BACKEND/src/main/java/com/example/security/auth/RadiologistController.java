package com.example.security.auth;

import com.example.security.DTOs.AnnotatedImagesDTO;
import com.example.security.DTOs.InvitationDTO;
import com.example.security.DTOs.Requests.AcceptInvRequest;
import com.example.security.DTOs.Requests.AnnotatedImageRequest;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.Model.Actors.User;
import com.example.security.Model.AnnotatedImages;
import com.example.security.Repositories.UserRepo;
import com.example.security.services.doctor.GetJsonUrlService;
import com.example.security.services.login.JwtService;
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
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GetJsonUrlService getJsonUrlService;

    @PostMapping("/accept-invitation")
    public ResponseEntity<String> acceptInvitation(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody AcceptInvRequest acceptInvRequest) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"radiologist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
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
    public ResponseEntity<List<InvitationDTO>> listInvitations(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody EmailRequest emailRequest) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"radiologist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        String receiverEmail = emailRequest.getEmail();
        List<InvitationDTO> invitations = listingInvitations.getInvitationsByReceiverEmail(receiverEmail);
        return ResponseEntity.ok(invitations);
    }

    @Autowired
    private AnnotatedImageService annotatedImageService;
    private static final Logger logger = LoggerFactory.getLogger(RadiologistController.class);
    @PostMapping("/upload-image-annotated")
    public ResponseEntity<String> uploadAnnotatedImage(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody AnnotatedImageRequest request){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"radiologist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        ResponseEntity<String> response= annotatedImageService.uploadAnnotations(request,userEmail);
        if (response.getStatusCode().equals(HttpStatus.OK)) {
            return new ResponseEntity<>("Uploaded annotated Images successfully", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Upload not successful", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-json-aws-url")
    public ResponseEntity<String> getJsonUrl(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam Long caseId){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"radiologist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        ResponseEntity<String> response=getJsonUrlService.getUrl(caseId);

        return ResponseEntity.ok(response.getBody());
        
    }


    @GetMapping("/get-list-of-annotatedimages")
    public ResponseEntity<List<AnnotatedImagesDTO>> getListOfAnnotatedImages(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam Long caseId){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"radiologist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        //  List<AnnotatedImagesDTO> listOfannotatedImages=annotatedImageService.getListofAnnotatedImages(caseId);
        // return listOfannotatedImages;
        List<AnnotatedImagesDTO> listOfAnnotatedImages=annotatedImageService.getListOfAnnotatedImagesDTOByCaseId(caseId);
        return  ResponseEntity.ok(listOfAnnotatedImages);
    }
}
