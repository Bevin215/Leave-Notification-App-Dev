package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.LeaveRequest;
import com.example.demo.model.LeaveType;

public interface LeaveTypeRepository extends MongoRepository<LeaveType, String> {
	   

}


