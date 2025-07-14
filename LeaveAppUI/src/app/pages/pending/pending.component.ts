import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LeaveRequestService } from 'src/app/Services/leaverequest.service';
import { LeaveRequest } from 'src/app/models/LeaveRequest';
 
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  currentTab: 'Pending' | 'Approved' | 'Rejected' = 'Pending';
 
  pendingLeaves: LeaveRequest[] = [];
  approvedLeaves: any[] = [];
  rejectedLeaves: any[] = [];
 
  selectedLeave: any = null;
  showRejectPopup = false;
  rejectionComment = '';
  constructor(private myService: LeaveRequestService) {}
 
  ngOnInit(): void {
    this.myService.getEmp().subscribe({
      next: (data: LeaveRequest[]) => {
        this.pendingLeaves = data;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
      }
    });
  }
 
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
  this.selectedLeave.approvalstatus = 'Approved';      
  this.selectedLeave.leadComments = '';               

  this.myService.saveLeave(this.selectedLeave).subscribe({
    next: () => {
      this.approvedLeaves.push(this.selectedLeave);
      this.pendingLeaves = this.pendingLeaves.filter(l => l !== this.selectedLeave);
      this.closeDetails();
    },
    error: err => console.error('Save failed', err)
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
  if (this.rejectionComment.trim()) {
    this.selectedLeave.approvalstatus = 'Rejected';   
    this.selectedLeave.leadComments = this.rejectionComment; 

    this.myService.saveLeave(this.selectedLeave).subscribe({
      next: () => {
        this.rejectedLeaves.push(this.selectedLeave);
        this.pendingLeaves = this.pendingLeaves.filter(l => l !== this.selectedLeave);
        this.closeDetails();
      },
      error: err => console.error('Save failed', err)
    });
  }
}

 
  closeDetails() {
    this.selectedLeave = null;
    this.showRejectPopup = false;
    this.rejectionComment = '';
  }
}