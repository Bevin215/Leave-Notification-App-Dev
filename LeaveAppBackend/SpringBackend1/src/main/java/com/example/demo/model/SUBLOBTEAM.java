package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sublob")
public class SUBLOBTEAM {

    @Id
    private String id;

    private String name; 

    public SUBLOBTEAM() {}

    public SUBLOBTEAM(String name) {
        this.name = name;
    }

   
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
