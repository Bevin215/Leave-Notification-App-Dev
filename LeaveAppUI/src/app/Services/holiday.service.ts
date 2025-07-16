import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private apiUrl = 'http://localhost:8080/api/holidays/all';
  private cacheKey = 'holidayDates';

  constructor(private http: HttpClient) {}

  getHolidayDates(): Observable<string[]> {
  const cacheKey = 'cachedHolidayDates';
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    return of(JSON.parse(cached));
  } else {
    return new Observable(observer => {
      this.http.get<any[]>(this.apiUrl).subscribe(holidays => {
        const dates = holidays.map(h => h.date);
        localStorage.setItem(cacheKey, JSON.stringify(dates)); // Cache dates
        observer.next(dates);
        observer.complete();
      }, error => observer.error(error));
    });
  }
}

  calculateLeaveDays(startDate: string, endDate: string): Observable<number> {
    return this.getHolidayDates().pipe(
      map((holidayDates: string[]) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let count = 0;

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const day = d.getDay(); // 0: Sunday, 6: Saturday
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

  // Optional: clear cache manually
  clearHolidayCache(): void {
    localStorage.removeItem(this.cacheKey);
  }
}
