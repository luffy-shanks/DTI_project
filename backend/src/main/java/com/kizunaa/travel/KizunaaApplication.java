package com.kizunaa.travel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KizunaaApplication {

    public static void main(String[] args) {
        SpringApplication.run(KizunaaApplication.class, args);
        System.out.println("=================================================");
        System.out.println(" Kizunaa Travel Intelligence Backend Initialized ");
        System.out.println(" API: http://localhost:8080/api                   ");
        System.out.println(" H2 Console: http://localhost:8080/h2-console     ");
        System.out.println("=================================================");
    }
}
