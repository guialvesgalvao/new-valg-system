export interface IBill {
  id?: number;
  name: string;
  amount: number;
  dueDate: Date;
  userId: number;
  status?: string;
  isRecurring?: boolean;
  modifiedAt?: string;
  createdAt?: string;
}

export interface IBillDBSchema {
  id: number;
  name: string;
  amount: number;
  due_date: string;
  status:  string;
  is_generated_by_recurrence: number; 
  user_id:  number;
  modified_at: string;
  created_at: string;
}

export interface IUnvalidatedBills {
  name?: string;
  amount?: number;
  dueDate?: Date;
  isRecurring?: boolean;
}
