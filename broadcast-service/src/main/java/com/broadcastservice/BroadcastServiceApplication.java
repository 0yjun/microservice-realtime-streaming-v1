package com.broadcastservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableDiscoveryClient
public class BroadcastServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BroadcastServiceApplication.class, args);
    }

}
