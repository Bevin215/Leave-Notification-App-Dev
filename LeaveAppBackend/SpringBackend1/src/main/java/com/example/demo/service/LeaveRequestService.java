package com.example.demo.service;

import com.example.demo.model.Holiday;
import com.example.demo.model.LeaveRequest;
import com.example.demo.repository.HolidayRepository;
import com.example.demo.repository.LeaveRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private HolidayRepository holidayRepository;

    public LeaveRequest submitLeave(LeaveRequest leaveRequest) {
    	 validateLeaveRequest(leaveRequest);
         List<Holiday> holidays = holidayRepository.findAll();
         Set<LocalDate> holidayDates = holidays.stream()
                 .map(Holiday::getDate)
                 .collect(Collectors.toSet());

         int leaveDays = calculateWorkingDaysExcludingHolidays(
                 leaveRequest.getStartDate(),
                 leaveRequest.getEndDate(),
                 holidayDates
         );

         if (leaveDays <= 0) {
             throw new IllegalArgumentException("Leaves can't be applied on weekends or company holidays.");
         }

         leaveRequest.setLeaveDays(leaveDays);
         return leaveRequestRepository.save(leaveRequest);
     
    }
    public int calculateLeaveDays(LocalDate start, LocalDate end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Start and End dates must be provided.");
        }
        if (start.isAfter(end)) {
            throw new IllegalArgumentException("The End Date can't be before the Start Date.");
        }

        List<Holiday> holidays = holidayRepository.findAll();
        Set<LocalDate> holidayDates = holidays.stream()
                .map(Holiday::getDate)
                .collect(Collectors.toSet());

        return calculateWorkingDaysExcludingHolidays(start, end, holidayDates);
    }


    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    private int calculateWorkingDaysExcludingHolidays(LocalDate start, LocalDate end, Set<LocalDate> holidays) {
    	int workingDays = 0;
        LocalDate date = start;

        while (!date.isAfter(end)) {
            DayOfWeek day = date.getDayOfWeek();
            if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY && !holidays.contains(date)) {
                workingDays++;
            }
            date = date.plusDays(1);
        }
        return workingDays;
    }
    private void validateLeaveRequest(LeaveRequest request) {
        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new IllegalArgumentException("Start and End dates must not be null.");
        }

        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new IllegalArgumentException("The End Date can't be before the Start Date.");
        }
        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Leave cannot be applied on a past date.");
        }
    }
}
