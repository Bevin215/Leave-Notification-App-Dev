export interface LeaveRequest {
  id?: string;
  name: string;
  sublob: string;
  userId: string;
  leadId: string;
  userLevel: number;
  leadLevel: number;
  userEmail: string;
  leadEmail: string;
  leadComments: string;
  approvalstatus: string;
}
