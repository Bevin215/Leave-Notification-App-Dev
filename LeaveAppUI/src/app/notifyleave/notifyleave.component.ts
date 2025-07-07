import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder,private router: Router) { }

 dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;

  if (start && end && new Date(end) < new Date(start)) {
    return { invalidDateRange: true };
  }
  return null;
}

  ngOnInit() {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      availedBy: [this.listOfUsers[1], Validators.required],
      startDate: [new Date().toISOString().split('T')[0], Validators.required],
      endDate: [new Date().toISOString().split('T')[0], Validators.required],
      briefReason: "",
      backupContact: [[], Validators.required],
      notifyTo: [[], Validators.required],
      baseLocation: "",
      projectSow: "",
      subLobTeam: "",
      leaveStatus: ['Availed'],
      comments: "",
    },
  { validators: this.dateRangeValidator });
  }

  today: string = new Date().toISOString().split('T')[0];


 

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
    console.log("Default selected user:", this.leaveForm.get('availedBy')?.value);


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
