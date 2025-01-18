import { BillsReponse } from "../interface/IBill";

export class Bill {
  private readonly _id: number;
  private readonly _billName: string;
  private readonly _amount: number;
  private readonly _dueDate: Date;

  private readonly _createdAt: Date;
  private readonly _modifiedAt: Date;

  constructor(data: BillsReponse) {
    this._id = data.id;
    this._billName = data.bill_name;
    this._amount = data.amount;
    this._dueDate = new Date(data.due_date);

    this._createdAt = new Date(data.created_at);
    this._modifiedAt = new Date(data.modified_at);
  }

  public get id(): number {
    return this._id;
  }

  public get billName(): string {
    return this._billName;
  }

  public get amount(): number {
    return this._amount;
  }

  public get dueDate(): Date {
    return this._dueDate;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get modifiedAt(): Date {
    return this._modifiedAt;
  }
}
