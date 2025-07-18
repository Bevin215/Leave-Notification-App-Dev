export interface usersadmin {
  id?: string;
  availedBy: string;
  subLobTeam: string;

  userId: string;
  leadId: string;

  userLevel: number;
  leadLevel: number;

  userEmail: string;
  leadEmail: string;

  leadComments: string;
  approvalstatus: string;

  startDate: string;
  endDate: string;
  leaveType: string;
  leaveStatus: string;
  projectSow: string;

  notifyToRecipients: string[];
}
