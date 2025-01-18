export interface IBill {
  id: number;
  billName: string;
  amount: number;
  dueDate: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export interface BillsReponse {
  id: number;
  bill_name: string;
  amount: number;
  due_date: Date;
  created_at: Date;
  modified_at: Date;
}

export interface BillsRequest {
  id?: number;
  bill_name?: string;
  amount?: number;
  due_date?: Date;
}