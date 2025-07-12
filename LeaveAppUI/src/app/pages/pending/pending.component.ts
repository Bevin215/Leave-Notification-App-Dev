import { Component } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {
  currentTab: 'Pending' | 'Approved' | 'Rejected' = 'Pending';

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
    },
    {
    name: 'Hema Jothi',
    startDate: '08/20/2025',
    endDate: '08/25/2025',
    type: 'Casual Leave',
    reason: 'Family event',
    backupContact: 'Gnanadoss, Praveen',
    notifyTo: 'Gnanadoss, Praveen',
    location: 'Chennai',
    project: '1286',
    team: 'FCT-QA',
    status: 'Pending',
    comments: ''
},

{
    name: 'Bevin John',
    startDate: '07/25/2025',
    endDate: '07/26/2025',
    type: 'Earned Leave',
    reason: 'Vacation',
    backupContact: 'Gnanadoss, Praveen',
    notifyTo: 'Gnanadoss, Praveen',
    location: 'Chennai',
    project: '1286',
    team: 'FCT-DEV',
    status: 'Pending',
    comments: ''
  },
{
    name: 'Santhosh PN',
    startDate: '07/14/2025',
    endDate: '07/18/2025',
    type: 'Sick Off',
    reason: 'Migraine',
    backupContact: 'Gnanadoss, Praveen',
    notifyTo: 'Gnanadoss, Praveen',
    location: 'Chennai',
    project: '1286',
    team: 'FCT-QA',
    status: 'Pending',
    comments: 'Medical certificate submitted'
  },

{
    name: 'Logesh Ravichandran',
    startDate: '07/28/2025',
    endDate: '07/30/2025',
    type: 'Casual Leave',
    reason: 'Personal work',
    backupContact: 'Gnanadoss, Praveen',
    notifyTo: 'Gnanadoss, Praveen',
    location: 'Chennai',
    project: '1286',
    team: 'FCT-QA',
    status: 'Pending',
    comments: ''
  },

{
    name: 'Santhosh Ganesan',
    startDate: '08/01/2025',
    endDate: '08/10/2025',
    type: 'Casual Leave',
    reason: 'Vacation',
    backupContact: 'Gnanadoss, Praveen',
    notifyTo: 'Gnanadoss, Praveen',
    location: 'Chennai',
    project: '1286',
    team: 'FCT-QA',
    status: 'Pending',
    comments: 'Requesting Approval for Long Term Leave'
  },

{
    name: 'Asifa ',
    startDate: '07/19/2025',
    endDate: '07/20/2025',
    type: 'Casual Leave',
    reason: 'Travel',
    backupContact: 'Gnanadoss, Praveen',
    notifyTo: 'Gnanadoss, Praveen',
    location: 'Chennai',
    project: '1286',
    team: 'FCT-DEV',
    status: 'Pending',
    comments: ''
  }

  ];
  approvedLeaves: any[] = [];
  rejectedLeaves: any[] = [];

  selectedLeave: any = null;
  showRejectPopup = false;
  rejectionComment = '';

  get visibleLeaves() {
    if (this.currentTab === 'Approved') return this.approvedLeaves;
    if (this.currentTab === 'Rejected') return this.rejectedLeaves;
    return this.pendingLeaves;
  }

  setTab(tab: 'Pending' | 'Approved' | 'Rejected') {
    this.currentTab = tab;
    this.closeDetails();
  }

  openDetails(leave: any) {
    this.selectedLeave = leave;
  }

  approveLeave() {
    this.selectedLeave.status = 'Approved';
    this.approvedLeaves.push(this.selectedLeave);
    this.pendingLeaves = this.pendingLeaves.filter(l => l !== this.selectedLeave);
    this.closeDetails();
  }

  rejectLeave() {
    this.showRejectPopup = true;
  }

  cancelReject() {
    this.showRejectPopup = false;
    this.rejectionComment = '';
  }

  confirmReject() {
    if (this.rejectionComment.trim()) {
      this.selectedLeave.status = 'Rejected';
      this.selectedLeave.comments = this.rejectionComment;
      this.rejectedLeaves.push(this.selectedLeave);
      this.pendingLeaves = this.pendingLeaves.filter(l => l !== this.selectedLeave);
      this.closeDetails();
    }
  }

  closeDetails() {
    this.selectedLeave = null;
    this.showRejectPopup = false;
    this.rejectionComment = '';
  }
}

