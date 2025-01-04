export interface IRecurringBill {
    id?: number;
    name: string;
    averageAmount: number;
    dayOfDue: number;
    endDate?: Date;
    user: string;
    enabled?: boolean;
    modifiedAt?: string;
    createdAt?: string;
  }
  
  export interface IRecurringBillDBSchema {
    id: number;
    name: string;
    average_amount: number;
    day_of_due: number;
    end_date?:  Date;
    user:  string;
    enabled?:  boolean;
    modified_at: string;
    created_at: string;
  }
  
  export interface IUnvalidatedRecurringBills {
    name?: string;
    averageAmount?: number;
    dayOfDue?: number;
    endDate?: Date;
    user?: string;
    enabled?: boolean;
  }
  