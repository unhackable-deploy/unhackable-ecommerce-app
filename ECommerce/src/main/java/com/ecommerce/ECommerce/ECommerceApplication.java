package com.ecommerce.ECommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.*;

@SpringBootApplication
@RestController
public class ECommerceApplication {
    private static final Logger logger = LogManager.getLogger(ECommerceApplication.class);
	public static void main(String[] args) {
		logger.info("Starting up web ecommerce web app");
		SpringApplication.run(ECommerceApplication.class, args);
	}
}
