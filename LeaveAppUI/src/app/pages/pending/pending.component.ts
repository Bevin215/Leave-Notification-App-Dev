import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LeaveRequestService } from 'src/app/Services/leaverequest.service';
import { usersadmin } from 'src/app/models/LeaveRequest';
import { FormsModule } from '@angular/forms';
import { HolidayService } from 'src/app/Services/holiday.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  currentTab: 'Pending' | 'Approved' | 'Rejected' = 'Pending';

  pendingLeaves: usersadmin[] = [];
  approvedLeaves: any[] = [];
  rejectedLeaves: any[] = [];

  selectedLeave: any = null;
  showRejectPopup = false;
  rejectionComment = '';
  rejectionCommentLength = 0;

  rejectionErrors = {
    containsEmoji: false,
    numbersOnly: false,
    invalidChars: false,
    maxLength: false,
  };

  validateRejectionComment(value: string): void {
    const trimmed = (value || '').trim().replace(/\s{2,}/g, ' ');
    this.rejectionCommentLength = trimmed.length;
    this.rejectionErrors = {
      containsEmoji: false,
      numbersOnly: false,
      invalidChars: false,
      maxLength: false,
    };

    const emojiRegex =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;

    if (emojiRegex.test(trimmed)) {
      this.rejectionErrors.containsEmoji = true;
      return;
    }

    if (/^\d+$/.test(trimmed)) {
      this.rejectionErrors.numbersOnly = true;
      return;
    }

    if (!/^[a-zA-Z0-9.,\-\s]+$/.test(trimmed)) {
      this.rejectionErrors.invalidChars = true;
      return;
    }

    if (trimmed.length > 100) {
      this.rejectionErrors.maxLength = true;
      return;
    }
  }
  constructor(
    private myService: LeaveRequestService,
    private holidayService: HolidayService
  ) {}

  ngOnInit(): void {
    this.myService.getEmp().subscribe({
      next: (data: usersadmin[]) => {
        console.log('Data saved in DB');
        this.pendingLeaves = data;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
      },
    });
  }

  get visibleLeaves() {
    if (this.currentTab === 'Approved') return this.approvedLeaves;
    if (this.currentTab === 'Rejected') return this.rejectedLeaves;
    const observables = this.pendingLeaves.map((leave) => {
      const formattedStartDate = this.formatDateToISO(leave.startDate);
      const formattedEndDate = this.formatDateToISO(leave.endDate);

      return this.holidayService
        .calculateLeaveDays(formattedStartDate, formattedEndDate)
        .pipe(
          map((count) => ({
            ...leave,
            leaveCount: count,
          }))
        );
    });
    forkJoin(observables).subscribe((updatedLeaves) => {
      this.pendingLeaves = updatedLeaves;
      console.log(this.pendingLeaves);
    });

    console.log(this.pendingLeaves);
    return this.pendingLeaves;
  }

  formatDateToISO(dateStr: string): string {
    const [month, day, year] = dateStr.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  setTab(tab: 'Pending' | 'Approved' | 'Rejected') {
    this.currentTab = tab;
    this.closeDetails();
  }

  openDetails(leave: any) {
    this.selectedLeave = leave;
  }

  approveLeave() {
    this.selectedLeave.approvalstatus = 'Approved';
    this.selectedLeave.leadComments = '';

    this.myService.saveLeave(this.selectedLeave).subscribe({
      next: () => {
        this.approvedLeaves.push(this.selectedLeave);
        this.pendingLeaves = this.pendingLeaves.filter(
          (l) => l !== this.selectedLeave
        );
        this.closeDetails();
      },
      error: (err) => console.error('Save failed', err),
    });
  }

  rejectLeave() {
    this.showRejectPopup = true;
  }

  cancelReject() {
    this.showRejectPopup = false;
    this.rejectionComment = '';
  }

  confirmReject() {
    const trimmedComment = this.rejectionComment.trim();
    if (trimmedComment) {
      this.selectedLeave.approvalstatus = 'Rejected';
      this.selectedLeave.leadComments = trimmedComment;

      this.myService.saveLeave(this.selectedLeave).subscribe({
        next: () => {
          this.rejectedLeaves.push(this.selectedLeave);
          this.pendingLeaves = this.pendingLeaves.filter(
            (l) => l !== this.selectedLeave
          );
          this.closeDetails();
        },
        error: (err) => console.error('Save failed', err),
      });
    }
  }

  closeDetails() {
    this.selectedLeave = null;
    this.showRejectPopup = false;
    this.rejectionComment = '';
  }
}
