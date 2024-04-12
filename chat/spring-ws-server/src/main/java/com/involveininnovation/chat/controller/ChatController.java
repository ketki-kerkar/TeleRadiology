package com.involveininnovation.chat.controller;

import com.involveininnovation.chat.model.Message;
import com.involveininnovation.chat.model.MessageEntity;
import com.involveininnovation.chat.model.Status;
import com.involveininnovation.chat.model.User;
import com.involveininnovation.chat.repository.UserRepository;
import com.involveininnovation.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        saveMessage(message);
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        saveMessage(message);
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        System.out.println(message.toString());
        return message;
    }

    @MessageMapping("/request-past-messages")
    public void requestPastMessages(@Payload Map<String, Object> payload) {
        String username = (String) payload.get("username");
        int pageNumber = (int) payload.get("pageNumber");
        int pageSize = (int) payload.get("pageSize");
        long timestamp = (long) payload.get("timestamp");

        sendPastMessagesToUser(username, pageNumber, pageSize, timestamp);
    }

    private void sendPastMessagesToUser(String username, int pageNumber, int pageSize, long timestamp) {
        // Find the joining time of the user
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Timestamp userJoiningTime = user.getJoiningTime();
            // Use the joining time of the user as the timestamp for fetching past messages
            Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("timestamp").ascending());
            Page<MessageEntity> messagesPage = messageRepository.findAllByTimestampAfterOrderByTimestampAsc(userJoiningTime, pageable);

            messagesPage.getContent().forEach(messageEntity -> {
                Message pastMessage = new Message();
                pastMessage.setSenderName(messageEntity.getUser().getUsername());
                pastMessage.setMessage(messageEntity.getMessageText());
                pastMessage.setStatus(Status.MESSAGE);
                simpMessagingTemplate.convertAndSendToUser(username, "/pastMessages", pastMessage);
            });
        } else {
            System.out.println("User not found!");
        }
    }

    private void saveMessage(Message message) {
        // Find user by username
        User user = userRepository.findByUsername(message.getSenderName());
        if (user == null) {
            // If user doesn't exist, create a new user and save to the database
            user = new User();
            user.setUsername(message.getSenderName());
            user.setJoiningTime(new Timestamp(System.currentTimeMillis()));
            userRepository.save(user);
        }
        // Create a new message entity and associate it with the user
        MessageEntity newMessage = new MessageEntity();
        newMessage.setUser(user);
        newMessage.setMessageText(message.getMessage()); // Ensure that the message text is properly set
        newMessage.setTimestamp(new Timestamp(System.currentTimeMillis())); // Set timestamp
        messageRepository.save(newMessage);
    }
}
