import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class dropdownService {

  constructor(private hc:HttpClient) { }

 private apiUrl = 'http://localhost:8080/api/dropdowns/all';


  getDropdownData(): Observable<any> {
    return this.hc.get<any>(this.apiUrl);
  }

  saveLeaveForm(data: any) {
  return this.hc.post('http://localhost:8080/api/leave/submit', data, { responseType: 'text' });

}

}
