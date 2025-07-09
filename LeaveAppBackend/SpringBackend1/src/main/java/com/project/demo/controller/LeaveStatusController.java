package com.project.demo.controller;

import com.example.demo.model.LeaveStatus;
import com.example.demo.repository.LeaveStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leavestatus")
@CrossOrigin("*")
public class LeaveStatusController {

    @Autowired
    private LeaveStatusRepository leaveStatusRepo;

    @PostMapping
    public LeaveStatus addLeaveStatus(@RequestBody LeaveStatus status) {
        return leaveStatusRepo.save(status);
    }

    @GetMapping
    public List<LeaveStatus> getAllStatuses() {
        return leaveStatusRepo.findAll();
    }
}
