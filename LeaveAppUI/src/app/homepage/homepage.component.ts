import { Component, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/Services/holiday.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  greeting: string = '';

  constructor(private holidayService: HolidayService) {}

  ngOnInit() {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning!';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon!';
    } else {
      this.greeting = 'Good Evening!';
    }

    // Optionally pre-cache once on load
    this.refreshHolidayDates();
  }

  refreshHolidayDates(): void {
    this.holidayService.getHolidayDates().subscribe(dates => {
      localStorage.setItem('holidayDates', JSON.stringify(dates));
      console.log('Holiday dates cached:', dates);
    });
  }
}
