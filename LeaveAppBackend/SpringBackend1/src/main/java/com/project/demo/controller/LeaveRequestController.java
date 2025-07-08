package com.project.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.LeaveRequest;
import com.example.demo.repository.LeaveRequestRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
 
@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")  
public class LeaveRequestController {
 
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
 
    
    @PostMapping("/apply")
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }
 
    
    @GetMapping("/all")
    public List<LeaveRequest> getAllLeaves() {
    	   return leaveRequestRepository.findAll();
    }
    
    @GetMapping("/insertSample")
    public String insertSampleLeaves() {
        List<LeaveRequest> list = new ArrayList<>();

        LeaveRequest leave1 = new LeaveRequest();
        leave1.setLeaveType("Sick Leave");
        leave1.setAvailedBy("Alice");
        leave1.setStartDate(LocalDate.of(2025, 7, 10));
        leave1.setEndDate(LocalDate.of(2025, 7, 12));
        leave1.setReason("Fever");
        leave1.setBackupContacts(List.of("backup1@example.com"));
        leave1.setNotifyToRecipients(List.of("manager@example.com"));
        leave1.setBaseLocation("Chennai");
        leave1.setProjectSow("Alpha");
        leave1.setSubTeam("Dev");
        leave1.setLeaveStatus("Pending");
        leave1.setComments("N/A");

        

        list.add(leave1);
        

        leaveRequestRepository.saveAll(list);

        return "Sample leave requests inserted!";
    }
    
    @PostMapping("/insertLeaveRequest")
    public LeaveRequest insertUserLeave(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }
}