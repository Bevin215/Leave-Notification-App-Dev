import { Component } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {
  pendingLeaves = [
    {
      name: 'Mark Daniel A',
      startDate: '07/22/2025',
      endDate: '07/22/2025',
      type: 'Sick Off',
      reason: 'Fever',
      backupContact: 'Gnanadoss, Praveen',
      notifyTo: 'Gnanadoss, Praveen',
      location: 'Chennai',
      project: '1286',
      team: 'FCT-DEV',
      status: 'Pending',
      comments: ''
    }
  ];

  selectedLeave: any = null;

  openDetails(leave: any) {
    this.selectedLeave = leave;
  }

  approveLeave() {
    this.selectedLeave.status = 'Approved';
    this.selectedLeave = null;
  }

  rejectLeave() {
    if (!this.selectedLeave.comments) {
      alert('Please enter comments before rejecting.');
      return;
    }
    this.selectedLeave.status = 'Rejected';
    this.selectedLeave = null;
  }
}
