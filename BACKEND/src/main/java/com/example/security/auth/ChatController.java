package com.example.security.auth;

import com.example.security.DTOs.MessageDTO;
import com.example.security.Model.AccessTable;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Case;
import com.example.security.Model.Messages;
import com.example.security.Model.Status;
import com.example.security.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/chat")
@CrossOrigin("http://localhost:3000")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private CaseRepo caseRepo;

    @Autowired
    private AccessTableRepo accessTableRepo;

    @Autowired
    private MessageRepo messageRepo;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageDTO receiveMessage(@Payload MessageDTO messageDTO) {
        saveMessage(messageDTO);
        return messageDTO;
    }

    @MessageMapping("/request-past-messages")
    public void requestPastMessages(@Payload Map<String, Object> payload) {
        String username = (String) payload.get("username");
        int pageNumber = (int) payload.get("pageNumber");
        int pageSize = (int) payload.get("pageSize");
        long timestamp = (long) payload.get("timestamp");
        Long caseId = Long.valueOf(payload.get("caseId").toString());

        sendPastMessagesToUser(username, caseId, pageNumber, pageSize, timestamp);
    }

    private void sendPastMessagesToUser(String username, Long caseId, int pageNumber, int pageSize, long timestamp) {
        Optional<User> userOptional = userRepo.findByEmail(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UUID userId = user.getUserId();

            Optional<Case> caseOptional = caseRepo.findById(caseId);

            if (caseOptional.isPresent()) {
                Case caseEntity = caseOptional.get();

                // Check if the user is a doctor
                Optional<Doctor> doctorOptional = doctorRepo.findByUserUserId(userId);

                if (doctorOptional.isPresent()) {
                    Doctor doctor = doctorOptional.get();
                    Long doctorId = doctor.getDoctorId();

                    // First, check if the doctor ID matches the doctor assigned to the case or is in the consented user IDs
                    if (doctorId.equals(caseEntity.getDoctor().getDoctorId()) || (caseEntity.getConsentedUserIds() != null && caseEntity.getConsentedUserIds().contains(doctorId))) {
                        // Checking access through access table
                        Optional<AccessTable> accessTableOptional = accessTableRepo.findByDoctorDoctorIdAndCasesCaseId(doctorId, caseId);
                        if (accessTableOptional.isPresent()) {
                            Timestamp userJoiningTime = (Timestamp) accessTableOptional.get().getTimestampAccepted();
                            Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("timestamp").ascending());
                            Page<Messages> messagesPage = messageRepo.findAllByTimestampAfterOrderByTimestampAsc(userJoiningTime, pageable);

                            messagesPage.getContent().forEach(messages -> {
                                MessageDTO pastMessage = new MessageDTO();
                                pastMessage.setSenderName(messages.getDoctor().getUser().getEmail());
                                pastMessage.setMessage(messages.getMessageText());
                                pastMessage.setStatus(Status.MESSAGE);
                                pastMessage.setCaseId(messages.getCases().getCaseId());
                                pastMessage.setDate(messages.getTimestamp());
                                pastMessage.setMessageId(messages.getMessageId());
                                simpMessagingTemplate.convertAndSendToUser(username, "/pastMessages", pastMessage);
                            });
                        } else {
                            System.out.println("Doctor is not assigned to the case.");
                        }
                    } else {
                        System.out.println("User is not a doctor.");
                    }
                } else {
                    System.out.println("Case not found.");
                }
            } else {
                System.out.println("User not found.");
            }
        }
    }

    private void saveMessage(MessageDTO messageDTO) {
        // Find user by email
        Optional<User> userOptional = userRepo.findByEmail(messageDTO.getSenderName());

        userOptional.ifPresent(user -> {
            // Retrieve user ID
            UUID userId = user.getUserId();

            // Find doctor by user ID
            Optional<Doctor> doctorOptional = doctorRepo.findByUserUserId(userId);

            doctorOptional.ifPresent(doctor -> {
                // Retrieve doctor ID
                Long doctorId = doctor.getDoctorId();

                // Retrieve the Case object corresponding to the provided caseId
                Optional<Case> caseOptional = caseRepo.findById(messageDTO.getCaseId());

                caseOptional.ifPresent(caseEntity -> {
                    // Create a new message entity and associate it with the doctor ID and Case object
                    Messages newMessage = new Messages();
                    newMessage.setDoctor(doctor);
                    newMessage.setCases(caseEntity); // Set the Case object
                    newMessage.setMessageText(messageDTO.getMessage()); // Ensure that the message text is properly set
                    newMessage.setTimestamp(new Timestamp(System.currentTimeMillis())); // Set timestamp

                    // Save the new message entity
                    messageRepo.save(newMessage);
                });
            });
        });
    }
}
