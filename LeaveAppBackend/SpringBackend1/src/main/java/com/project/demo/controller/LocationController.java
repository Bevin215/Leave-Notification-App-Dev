package com.project.demo.controller;

import com.example.demo.model.Location;
import com.example.demo.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin("*")
public class LocationController {

    @Autowired
    private LocationRepository locationRepo;

    
    @PostMapping
    public Location saveLocation(@RequestBody Location location) {
        return locationRepo.save(location);
    }

   
    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }
}
