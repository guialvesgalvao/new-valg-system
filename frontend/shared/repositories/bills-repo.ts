import axios from "axios";
import { BillsReponse, IBill } from "../interface/IBill";

export class BillsRepo {
    private readonly API_URL = 'http://localhost:3000/api/bills';

    async getBills(): Promise<BillsReponse[]> {
        const response = await axios.get(this.API_URL);

        return response.data
    }

    async updateBill(bill: IBill): Promise<BillsReponse[]> {
        const url = this.API_URL + `/${bill.id}`;
        const response = await axios.put(url, bill);

        return response.data
    }

} 