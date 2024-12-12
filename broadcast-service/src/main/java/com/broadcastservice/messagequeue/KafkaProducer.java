package com.broadcastservice.messagequeue;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private final KafkaTemplate<String,String> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendBroadcastCreatedEvent(int broadcastId){
        String topic = "broadcast-created";
        String message = String.format("{\"broadcastId\": \"%s\"}", broadcastId);
        kafkaTemplate.send(topic,message);
        System.out.println("kafka run: messge "+ message);
    }
}
