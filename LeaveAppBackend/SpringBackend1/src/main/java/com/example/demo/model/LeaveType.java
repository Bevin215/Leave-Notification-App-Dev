package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "leave_type")
public class LeaveType {
	@Id
    private String id;
 
    private String leaveType;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
 
    public String getLeaveType() {
        return leaveType;
    }
    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }
}
