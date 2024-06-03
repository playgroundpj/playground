package com.players.playground.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.players.playground")
public class PlaygroundApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlaygroundApplication.class, args);
	}
}
