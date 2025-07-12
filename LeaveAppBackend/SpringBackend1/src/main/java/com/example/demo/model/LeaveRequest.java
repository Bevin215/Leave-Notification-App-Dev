package com.example.demo.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;

	@Document(collection = "leave_requests")
	public class LeaveRequest {
	 
	    @Id
	    private String id;
	 
	    private String leaveType;
	    private String availedBy;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private String reason; 
	 
	    private List<String> backupContacts;
	    private List<String> notifyToRecipients;
	 
	    private String baseLocation;
	    private String projectSow;
	    private String subTeam;
	    private String leaveStatus; 
	    private long leaveDays;
	 
	    private String comments; 
	 
	   
	 
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
	 
	    public String getAvailedBy() {
	        return availedBy;
	    }
	    public void setAvailedBy(String availedBy) {
	        this.availedBy = availedBy;
	    }
	 
	    public LocalDate getStartDate() {
	        return startDate;
	    }
	    public void setStartDate(LocalDate startDate) {
	        this.startDate = startDate;
	    }
	 
	    public LocalDate getEndDate() {
	        return endDate;
	    }
	    public void setEndDate(LocalDate endDate) {
	        this.endDate = endDate;
	    }
	 
	    public String getReason() {
	        return reason;
	    }
	    public void setReason(String reason) {
	        this.reason = reason;
	    }
	 
	    public List<String> getBackupContacts() {
	        return backupContacts;
	    }
	    public void setBackupContacts(List<String> backupContacts) {
	        this.backupContacts = backupContacts;
	    }
	 
	    public List<String> getNotifyToRecipients() {
	        return notifyToRecipients;
	    }
	    public void setNotifyToRecipients(List<String> notifyToRecipients) {
	        this.notifyToRecipients = notifyToRecipients;
	    }
	 
	    public String getBaseLocation() {
	        return baseLocation;
	    }
	    public void setBaseLocation(String baseLocation) {
	        this.baseLocation = baseLocation;
	    }
	 
	    public String getProjectSow() {
	        return projectSow;
	    }
	    public void setProjectSow(String projectSow) {
	        this.projectSow = projectSow;
	    }
	 
	    public String getSubTeam() {
	        return subTeam;
	    }
	    public void setSubTeam(String subTeam) {
	        this.subTeam = subTeam;
	    }
	 
	    public String getLeaveStatus() {
	        return leaveStatus;
	    }
	    public void setLeaveStatus(String leaveStatus) {
	        this.leaveStatus = leaveStatus;
	    }
	 
	    public String getComments() {
	        return comments;
	    }
	    public void setComments(String comments) {
	        this.comments = comments;
	    }
	    public long getLeaveDays() {
	        return leaveDays;
	    }

	    public void setLeaveDays(long leaveDays) {
	        this.leaveDays = leaveDays;
	    }
	}

