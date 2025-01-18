import axios from "axios";
import { BillsReponse, BillsRequest } from "../interface/IBill";

export class BillsRepo {
    private readonly API_URL = 'http://localhost:3000/api/bills';

    async getBills(): Promise<BillsReponse[]> {
        const response = await axios.get(this.API_URL);

        return response.data
    }

    async createBill(bill: BillsRequest): Promise<BillsReponse> {
        const url = this.API_URL;
        const response = await axios.post(url, bill);

        return response.data
    }

    async updateBill(bill: BillsRequest): Promise<BillsReponse> {
        const url = this.API_URL;
        const response = await axios.put(url, bill);

        return response.data
    }

    async deleteBill(billId: number): Promise<number> {
        const url = this.API_URL;
        const response = await axios.delete(url, 
            {
                data: {
                    id: billId
                }
            }
        );

        return response.data
    }

} 