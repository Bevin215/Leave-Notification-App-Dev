import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
 
@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
 
  private apiUrl = 'http://localhost:8080/api/leaves';  
 
  constructor(private hc:HttpClient) { }
 
  getEmp(): Observable<any> {
    return this.hc.get(`${this.apiUrl}/all`);
}
saveLeave(leave: any): Observable<any> {
  return this.hc.post('http://localhost:8080/api/usersadmin/add', leave, { responseType: 'text' });
}
}