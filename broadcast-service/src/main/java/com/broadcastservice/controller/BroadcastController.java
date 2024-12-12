package com.broadcastservice.controller;

import com.broadcastservice.messagequeue.KafkaProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/broadcasts")
public class BroadcastController {
    private final KafkaProducer kafkaProducer;

    public BroadcastController(KafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }


    @GetMapping("/health-check")
    public String status(){
        return  "run";
    };

    @PostMapping("/start")
    public ResponseEntity<?> startBroadCast(){
        kafkaProducer.sendBroadcastCreatedEvent(1);
        return ResponseEntity.status(200).build();
    }
}
