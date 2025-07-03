import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface listOfUsers {
  id: number;
  name: string;
}
@Component({
  selector: 'app-notifyleave',
  templateUrl: './notifyleave.component.html',
  styleUrls: ['./notifyleave.component.css']
})

export class NotifyleaveComponent {
  
  constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.leaveForm = this.fb.group({
        leaveType: "",
        selectedOption:1,
        startDate:new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        briefReason: "",
        backupContact:  "",
        notifyTo:  "",
        baseLocation:  "",
        projectSow: "",
        subLobTeam: "",
        leaveStatus: "",
        comments: "",
        });
    }
  
  listOfUsers = [
      {id: 1, name: "Polagani Vimala",email:"vimala.polagani@accenture.com"},
      {id: 2, name: "Bevin John" ,email:"bevin.john@accenture.com"},
      {id: 3, name: "Logesh" ,email:"logesh.r@accenture.com"},
      {id: 4, name: "Mark Daniel" ,email:"mark.daniel@accenture.com"},
   ];
   
  
  leaveForm = new FormGroup({
        leaveType: new FormControl(),
        selectedOption: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl(),
        briefReason: new FormControl(),
        backupContact: new FormControl(),
        notifyTo: new FormControl(),
        baseLocation: new FormControl(),
        projectSow: new FormControl(),
        subLobTeam: new FormControl(),
        leaveStatus: new FormControl(),
        comments: new FormControl()

    });
    
    onSubmit(){

    }
}
