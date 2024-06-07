import axios from "axios";

interface IGetBillProps {
    tableName: string;
    id?: number;
}

export async function getBills ({ tableName, id }: IGetBillProps) {
    try {
        const response = await axios.get(`http://localhost:5000/${tableName}${ id ? `/${id}` : '' }`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'ABA'
            },
        });

        const data = response.data;
        
        const result = data.length ?  data : [data];

        console.log(result)
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

interface ICreateBillProps {
    tableName: string;
    bill: any;
}

export async function createBill({ tableName, bill }: ICreateBillProps) {
    try {
        const response = await axios.post(
            `http://localhost:5000/${tableName}`,
            bill,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'ABA'
                }
            }
        );

        console.log(response.data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

interface IUpdateBillProps {
    tableName: string;
    bill: any;
    id: number;
}

export async function updateBill({ tableName, bill, id }: IUpdateBillProps) {
    try {
        const response = await axios.put(
            `http://localhost:5000/${tableName}/${id}`,
            bill,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'ABA'
                }
            }
        );

        console.log(response.data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
