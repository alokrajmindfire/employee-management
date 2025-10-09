export interface ILeave {
  id?: number;
  type: 'Sick' | 'Annual' | 'Casual';
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
