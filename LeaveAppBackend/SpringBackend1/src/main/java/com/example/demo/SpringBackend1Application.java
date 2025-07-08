package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.project.demo.controller")
public class SpringBackend1Application {

	public static void main(String[] args) {
		SpringApplication.run(SpringBackend1Application.class, args);
	}

}
