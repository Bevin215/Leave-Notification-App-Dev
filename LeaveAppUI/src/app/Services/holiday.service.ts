import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private apiUrl = 'http://localhost:8080/api/holidays/all';

  constructor(private http: HttpClient) {}
  getHolidayDates(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(holidays => holidays.map(h => h.date))
    );
  }

  calculateLeaveDays(startDate: string, endDate: string): Observable<number> {
    return this.getHolidayDates().pipe(
      map((holidayDates: string[]) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let count = 0;

        for (
          let d = new Date(start);
          d <= end;
          d.setDate(d.getDate() + 1)
        ) {
          const day = d.getDay();
          const dateStr = d.toISOString().split('T')[0];

          const isWeekend = day === 0 || day === 6;
          const isHoliday = holidayDates.includes(dateStr);

          if (!isWeekend && !isHoliday) {
            count++;
          }
        }

        return count;
      })
    );
  }
}
