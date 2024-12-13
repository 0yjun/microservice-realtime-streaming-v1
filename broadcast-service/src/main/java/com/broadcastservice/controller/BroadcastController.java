package com.broadcastservice.controller;

import com.broadcastservice.messaging.kafka.KafkaProducerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.UUID;

@Controller
@RequestMapping("/broadcast")
public class BroadcastController {
    private final KafkaProducerService kafkaProducerService;

    public BroadcastController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startBroadcast(){
        String random = String.valueOf(UUID.randomUUID());
        kafkaProducerService.sendMessage("broadcast-created",random);
        return ResponseEntity.status(HttpStatus.OK).body(random);
    }
}
