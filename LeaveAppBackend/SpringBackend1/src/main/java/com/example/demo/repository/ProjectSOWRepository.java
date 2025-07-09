package com.example.demo.repository;

import com.example.demo.model.ProjectSOW;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectSOWRepository extends MongoRepository<ProjectSOW, String> {
}
