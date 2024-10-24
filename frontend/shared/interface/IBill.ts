export interface IBill {
  id: number;
  amount: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface BillsReponse {
  id: number;
  amount: number;
  created_at: Date;
  modified_at: Date;
}