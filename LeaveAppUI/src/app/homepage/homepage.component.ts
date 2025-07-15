import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../Services/holiday.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  holidayDates: string[] = [];

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.loadHolidayDates();
  }

  loadHolidayDates(): void {
    this.holidayService.getHolidayDates().subscribe(dates => {
      this.holidayDates = dates;
    });
  }

  refreshHolidayDates(): void {
    this.holidayService.clearHolidayCache();
    this.loadHolidayDates(); // Force re-fetch
  }
}