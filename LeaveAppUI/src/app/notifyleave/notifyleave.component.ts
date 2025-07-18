import { Component, ViewChild } from '@angular/core';
import {AbstractControl,FormBuilder,FormControl,FormGroup,ValidationErrors,ValidatorFn,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { dropdownService } from '../Services/dropdown.service';
import { HolidayService } from '../Services/holiday.service';

export interface listOfUsers {
  id: number;
  name: string;
  userEmail: string;
}

@Component({
  selector: 'app-notifyleave',
  templateUrl: './notifyleave.component.html',
  styleUrls: ['./notifyleave.component.css']
})

export class NotifyleaveComponent {
  leaveOptions: string[] = [];
  locations: string[] = [];
  projects: string[] = [];
  subLobteams: string[] = [];
  leaveStatus: string[] = [];
  listOfUsers: any;
  searchLength = 0;
  leaveDays!: any;
  formSubmitted = false;
  showAlert = false;
  today: string = new Date().toISOString().split('T')[0];
  briefReasonLength: number = 0;
  commentSecLength: number = 0;
  loading = false;

  filteredUsers: any[] = [];
  filteredBackupUsers: listOfUsers[] = [];
  filteredNotifyUsers: listOfUsers[] = [];

  @ViewChild('backup') backupSelect!: NgSelectComponent;
  @ViewChild('notify') notifySelect!: NgSelectComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ds: dropdownService,
    private holidayService: HolidayService
  ) {}

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

  ngOnInit() {
    this.ds.getDropdownData().subscribe((data: any) => {
      this.leaveOptions = data.leaveTypes;
      this.locations = data.baseLocations;
      this.projects = data.projects;
      this.subLobteams = data.subTeams;
      this.leaveStatus = data.status;
      this.listOfUsers = data.user;
      console.log(this.listOfUsers);
    });

    this.leaveForm = this.fb.group(
      {
        leaveType: [null, Validators.required],
        availedBy: [[], Validators.required],
        startDate: [this.today, Validators.required],
        endDate: [this.today, Validators.required],
        reason: ['', [this.briefReasonValidator()]],
        backupContact: [[], Validators.required],
        notifyTo: [[], Validators.required],
        baseLocation: [null, Validators.required],
        projectSow: [null, Validators.required],
        subLobTeam: [null, Validators.required],
        leaveStatus: ['Availed', Validators.required],
        comments: ['', [this.commentSecValidator()]]
      },
      {
        validators: [this.dateRangeValidator, this.minStartDateValidator]
      }
    );

    this.leaveForm.get('startDate')?.valueChanges.subscribe(() => this.onDateChange());
    this.leaveForm.get('endDate')?.valueChanges.subscribe(() => this.onDateChange());

    this.onDateChange();
  }

  briefReasonValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value || '';
      if (value.trim() === '') return null;

      value = value.trim();
      const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;

      if (emojiRegex.test(value)) return { containsEmoji: true };
      if (/^\d+$/.test(value)) return { numbersOnly: true };
      if (!/^[a-zA-Z0-9.,\-\s]+$/.test(value)) return { invalidChars: true };

      const length = value.replace(/\s{2,}/g, ' ').length;
      return length > 100 ? { maxLength: true } : null;
    };
  }

  commentSecValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value || '';
      if (value.trim() === '') return null;

      value = value.trim();
      const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;

      if (emojiRegex.test(value)) return { containsEmoji: true };
      if (/^\d+$/.test(value)) return { numbersOnly: true };
      if (!/^[a-zA-Z0-9.,\-\s]+$/.test(value)) return { invalidChars: true };

      const length = value.replace(/\s{2,}/g, ' ').length;
      return length > 100 ? { maxLength: true } : null;
    };
  }

  minStartDateValidator(control: AbstractControl): ValidationErrors | null {
    const start = control.get('startDate')?.value;
    if (start) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(start);
      if (startDate < today) return { startDateInPast: true };
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

  onDateChange(): void {
    const start = this.leaveForm.get('startDate')?.value;
    const end = this.leaveForm.get('endDate')?.value;

    if (start && end) {
      this.holidayService.calculateLeaveDays(start, end).subscribe(days => {
        this.leaveDays = days;
      });
    }
  }

  formatToMMDDYYYY(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }

  onSubmit() {
    this.leaveForm.markAllAsTouched();
    this.formSubmitted = true;

    if (this.leaveForm.valid && this.leaveDays > 0) {
      const item = this.listOfUsers.find(
        (item: { name: any }) => item.name === this.leaveForm.value.availedBy
      );

      const formData = {
        ...this.leaveForm.value,
        userId: item.userId,
        leadId: item.leadId,
        userLevel: item.userLevel,
        leadLevel: item.leadLevel
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

  onBriefReasonInput(): void {
    const control = this.leaveForm.get('reason');
    if (control) {
      const value = (control.value || '').trim().replace(/\s{2,}/g, ' ');
      this.briefReasonLength = value.length;
    }
  }

  onCommentSecInput(): void {
    const control = this.leaveForm.get('comments');
    if (control) {
      const value = (control.value || '').trim().replace(/\s{2,}/g, ' ');
      this.commentSecLength = value.length;
    }
  }

  onNotifyChange() {
    this.notifySelect.searchTerm = '';
  }

  onBackupChange() {
    this.backupSelect.searchTerm = '';
  }

  goToPending() {
    this.router.navigate(['/pending']);
  }

  onBackupSearch(event: { term: string }) {
    const term = event.term;
    this.searchLength = term.length;

    this.filteredBackupUsers =
      term.length < 3
        ? []
        : this.listOfUsers.filter((user: { userEmail: string }) =>
            user.userEmail.toLowerCase().includes(term.toLowerCase())
          );
  }

  onBackupInput(event: any): void {
    if (event.target.value.length > 20) {
      event.target.value = event.target.value.slice(0, 20);
    }
  }

  onNotifySearch(event: { term: string }) {
    const term = event.term;
    this.searchLength = term.length;

    this.filteredNotifyUsers =
      term.length < 3
        ? []
        : this.listOfUsers.filter((user: { userEmail: string }) =>
            user.userEmail.toLowerCase().includes(term.toLowerCase())
          );
  }

  onNotifyInput(event: any): void {
    if (event.target.value.length > 20) {
      event.target.value = event.target.value.slice(0, 20);
    }
  }

  onSearch(event: { term: string; items: listOfUsers[] }): void {
    const term = event.term;
    this.searchLength = term.length;

    if (term.length < 3) {
      this.filteredUsers = [];
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.filteredUsers = this.listOfUsers.filter((user: any) =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(term.toLowerCase())
      );
      this.loading = false;
    }, 300);
  }

  onInputChange(event: any): void {
    if (event.target.value.length > 20) {
      event.target.value = event.target.value.slice(0, 20);
    }
  }
}
