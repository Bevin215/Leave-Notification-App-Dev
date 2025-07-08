package com.project.demo.controller;

import com.example.demo.model.ProjectSOW;
import com.example.demo.repository.ProjectSOWRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projectsow")
@CrossOrigin("*")
public class ProjectSOWController {

    @Autowired
    private ProjectSOWRepository projectSOWRepository;

    
    @PostMapping
    public ProjectSOW save(@RequestBody ProjectSOW sow) {
        return projectSOWRepository.save(sow);
    }

    
    @GetMapping
    public List<ProjectSOW> getAll() {
        return projectSOWRepository.findAll();
    }
}
