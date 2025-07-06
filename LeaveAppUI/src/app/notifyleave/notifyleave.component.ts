import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

export interface listOfUsers {
  id: number;
  name: string;
}
@Component({
  selector: 'app-notifyleave',
  templateUrl: './notifyleave.component.html',
  styleUrls: ['./notifyleave.component.css'],

})



export class NotifyleaveComponent {
  leaveForm = new FormGroup({
    leaveType: new FormControl(),
    availedBy: new FormControl(),
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


  constructor(private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      availedBy: this.listOfUsers[0],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      briefReason: "",
      backupContact: [[], Validators.required],
      notifyTo: "",
      baseLocation: "",
      projectSow: "",
      subLobTeam: "",
      leaveStatus: ['Availed'],
      comments: "",
    });
  }

  today: string = new Date().toISOString().split('T')[0];


  listOfUsers = [
    { id: 1, name: "Polagani Vimala", email: "vimala.polagani@accenture.com" },
    { id: 2, name: "Bevin John", email: "bevin.john@accenture.com" },
    { id: 3, name: "Logesh", email: "logesh.r@accenture.com" },
    { id: 4, name: "Mark Daniel", email: "mark.daniel@accenture.com" },
  ];
  leaveOptions = ['Sick Off', 'Planned Vacation', 'Unplanned Leave', 'Floating', 'Compensatory Off', 'Bereavement'];
  //leaveOptions = [{id:1,name:'Sick Off'},{id:1,name:'Planned Vacation'},{id:1,name:'Unplanned Leave'},{id:1,name:'Floating'},{id:1,name:'Compensatory Off'},{id:1,name:'Bereavement'}];

  locations = ['Bengaluru', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Coimbatore', 'Gurugram', 'Kolkata', 'Mumbai', 'New Delhi', 'Noida', 'Pune', 'Indore', 'Jaipur', 'Other'];
  projects = ['1136', '1286', 'Yet to onboard', 'PMO', 'Leadership'];
  subLobteams = ['FCT QA', 'FCT DEV', 'Mobile QA', 'Mobile DEV', 'ECVT QA', 'ECVT DEV', 'DPT-QA', 'DPT-DEV', 'EPT QA', 'EPT DEV', 'PMO', 'Yet to Onboard', 'Leadership'];
  leaveStatus = ['Availed', 'planned', 'Cancelled']

  formSubmitted = false;
  showAlert = false;

  onSubmit() {
    this.leaveForm.markAllAsTouched();
    this.formSubmitted = true;
    if (this.leaveForm.valid) {
      console.log('Form Submitted', this.leaveForm.value);
      this.router.navigate(['/success']);
    } else {
      console.log('Form is not valid!');
      this.showAlert = true;
    }

  }
  closeAlert() {
    this.formSubmitted = false;
  }

@ViewChild('backup') backupSelect!: NgSelectComponent;
@ViewChild('notify') notifySelect!: NgSelectComponent;

onNotifyChange() {
  this.notifySelect.searchTerm = '';
}

onBackupChange() {
  this.backupSelect.searchTerm = '';
 }
}
