import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import{dropdownService} from '../Services/dropdown.service';

export interface listOfUsers {
  id: number;
  name: string;
  userEmail: string;
}
@Component({
  selector: 'app-notifyleave',
  templateUrl: './notifyleave.component.html',
  styleUrls: ['./notifyleave.component.css'],

})



export class NotifyleaveComponent {
leaveOptions: string[] = [];
  locations: string[] = [];
  projects: string[] = [];
  subLobteams: string[] = [];
  leaveStatus: string[] = [];
  listOfUsers: any;

  constructor(private fb: FormBuilder,private router: Router,private ds:dropdownService) { }

  leaveForm = new FormGroup({
    leaveType: new FormControl(),
    availedBy: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    reason: new FormControl(),
    backupContact: new FormControl(),
    notifyTo: new FormControl(),
    baseLocation: new FormControl(),
    projectSow: new FormControl(),
    subLobTeam: new FormControl(),
    leaveStatus: new FormControl(),
    comments: new FormControl()

  });
  briefReasonLength: number = 0;
  briefReasonValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value || '';
    if (value.trim() === '') {
      return null;
    }

    value = value.trim();

    const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;
    if (emojiRegex.test(value)) {
      return { containsEmoji: true };
    }

    if (/^\d+$/.test(value)) {
      return { numbersOnly: true };
    }

    if (!/^[a-zA-Z0-9.,\-\s]+$/.test(value)) {
      return { invalidChars: true };
    }

    
    const length = value.replace(/\s{2,}/g, ' ').length;
    if (length > 100) {
      return { maxLength: true };
    }

    return null;
  };
}
onBriefReasonInput(): void {
  const control = this.leaveForm.get('reason');
  if (control) {
    const value = (control.value || '').trim().replace(/\s{2,}/g, ' ');
    this.briefReasonLength = value.length;
  }
}

commentSecLength: number = 0;

commentSecValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value || '';
    if (value.trim() === '') {
      return null;
    }
    value = value.trim();
    const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;
    if (emojiRegex.test(value)) {
      return { containsEmoji: true };
    }

    if (/^\d+$/.test(value)) {
      return { numbersOnly: true };
    }
    if (!/^[a-zA-Z0-9.,\-\s]+$/.test(value)) {
      return { invalidChars: true };
    }
    const length = value.replace(/\s{2,}/g, ' ').length;
    if (length > 100) {
      return { maxLength: true };
    }
    return null;
  };
}

onCommentSecInput(): void {
  const control = this.leaveForm.get('comments');
  if (control) {
    const value = (control.value || '').trim().replace(/\s{2,}/g, ' ');
    this.commentSecLength = value.length;
  }
}

  minStartDateValidator(control: AbstractControl): ValidationErrors | null {
  const start = control.get('startDate')?.value;
  if (start) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(start);
    if (startDate < today) {
      return { startDateInPast: true };
    }
  }
  return null;
}


 dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;

  if (start && end && new Date(end) < new Date(start)) {
    return { invalidDateRange: true };
  }
  return null;
}

  ngOnInit() {
    this.ds.getDropdownData().subscribe((data:any) => {
      this.leaveOptions = data.leaveTypes;
      this.locations = data.baseLocations;
      this.projects = data.projects;
      this.subLobteams = data.subTeams;
      this.leaveStatus = data.status;
      this.listOfUsers = data.user;
      console.log(this.listOfUsers);
    });
    this.leaveForm = this.fb.group({
      leaveType: [null, Validators.required],
      availedBy: [[], Validators.required],
      startDate: [new Date().toISOString().split('T')[0], Validators.required],
      endDate: [new Date().toISOString().split('T')[0], Validators.required],
      reason: ["", [this.briefReasonValidator()]],
      backupContact: [[], Validators.required],
      notifyTo: [[], Validators.required],
      baseLocation: [null, Validators.required], 
      projectSow: [null, Validators.required],
      subLobTeam: [null, Validators.required],
      leaveStatus: ['Availed', Validators.required],
      comments: ["", [this.commentSecValidator()]],
    },
  { validators: [this.dateRangeValidator, this.minStartDateValidator] });
  }

  today: string = new Date().toISOString().split('T')[0];


 

  formSubmitted = false;
  showAlert = false;

  // onSubmit() {
  //   this.leaveForm.markAllAsTouched();
  //   this.formSubmitted = true;
  //   if (this.leaveForm.valid) {
  //     console.log('Form Submitted', this.leaveForm.value);
  //     this.router.navigate(['/success']);
  //   } else {
  //     console.log('Form is not valid!');
  //     this.showAlert = true;
  //   }
  //   console.log("Default selected user:", this.leaveForm.get('availedBy')?.value);


  // }
  onSubmit() {
  this.leaveForm.markAllAsTouched();
  this.formSubmitted = true;

  if (this.leaveForm.valid) {
    const item = this.listOfUsers.find((item: { name: any; }) => item.name === this.leaveForm.value.availedBy);
    const formData = {
      ...this.leaveForm.value,
      userId: item.userId,
      leadId: item.leadId,
      userLevel: item.userLevel,
      leadLevel: item.leadLevel,
      //timestamp: new Date().toISOString()
    };

    this.ds.saveLeaveForm(formData).subscribe({
      next: (response) => {
        console.log('Form data saved:', response);
        this.router.navigate(['/success']); 
      },
      error: (err) => {
        console.error('Error saving form data', err);
        this.showAlert = true;
      }
    });

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
 
goToPending() {
    this.router.navigate(['/pending']);
  }


filteredUsers: any[] = [];
loading = false;

onSearch(event: { term: string; items: listOfUsers[] }): void {
  const term = event.term;

  if (term.length < 3) {
    this.filteredUsers = [];
    return;
  }

  this.loading = true;

  setTimeout(() => {
    this.filteredUsers = this.listOfUsers.filter((user:any) =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(term.toLowerCase())
    );
    this.loading = false;
  }, 300);
}
 

}
