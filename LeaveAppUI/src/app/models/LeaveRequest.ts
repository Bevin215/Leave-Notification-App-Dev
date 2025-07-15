export interface usersadmin {
  id?: string;
  name: string;
  sublob: string;
  userId: string;
  leadId: string;
  backupContacts: string[];
  notifyToRecipients: string[];
  userLevel: number;
  leadLevel: number;
  userEmail: string;
  leadEmail: string;
  leadComments: string;
  approvalstatus: string;
}
