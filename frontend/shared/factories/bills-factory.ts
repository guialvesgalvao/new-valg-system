import { BillsReponse } from "../interface/IBill";

export class Bill { 
    private _id: number;
    private _amount: number;

    private _createdAt: Date;
    private _modifiedAt: Date;

    constructor (data: BillsReponse){
        this._id = data.id
        this._amount = data.amount

        this._createdAt = new Date(data.created_at)
        this._modifiedAt = new Date(data.modified_at)
    }   

    public get id(): number {
        return this._id;
    }

    public get amount(): number {
        return this._amount;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get modifiedAt(): Date {
        return this._modifiedAt;
    }
}