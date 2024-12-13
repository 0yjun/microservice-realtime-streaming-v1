package com.broadcastservice.controller;

import com.broadcastservice.messaging.kafka.KafkaProducerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/broadcast")
public class BroadcastController {
    private final KafkaProducerService kafkaProducerService;

    public BroadcastController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startBroadcast(){
        kafkaProducerService.sendMessage("broadcast-start","start");
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }
}
