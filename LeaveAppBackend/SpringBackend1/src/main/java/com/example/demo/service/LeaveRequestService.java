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
       List<Holiday> holidays = holidayRepository.findAll();
        Set<LocalDate> holidayDates = holidays.stream()
            .map(Holiday::getDate)
            .collect(Collectors.toSet());

        // Calculate leave days excluding weekends and holidays
        int leaveDays = calculateWorkingDaysExcludingHolidays(leaveRequest.getStartDate(), leaveRequest.getEndDate(), holidayDates);

        // You can add a new field leaveDays to LeaveRequest model or store it elsewhere
        // For example, assuming you add private int leaveDays; with getter/setter
        leaveRequest.setLeaveDays(leaveDays);

        return leaveRequestRepository.save(leaveRequest);
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
}
