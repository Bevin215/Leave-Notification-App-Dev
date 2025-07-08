package com.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.LeaveType;
import com.example.demo.repository.LeaveTypeRepository;

@RestController
@RequestMapping("/api/leavetype")
@CrossOrigin(origins = "*")  
public class LeaveTypeController {
	  @Autowired
	    private LeaveTypeRepository leaveTypeRepository;
	 
	  @PostMapping("/insertLeaveType")
	  public LeaveType insertLeaveType(@RequestBody LeaveType leaveType) {
	      return leaveTypeRepository.save(leaveType);
	  }

	  @GetMapping("/all")
	  public List<LeaveType> getAllLeaveTypes() {
	      return leaveTypeRepository.findAll();
	  }
}
