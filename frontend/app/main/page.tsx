import { Bill } from "@/shared/factories/bills-factory";
import { BillsService } from "@/shared/services/bills-service";


export default async function BillsPage() {
  const billsService = new BillsService();

  try {
    // Chama o serviço diretamente no componente
    const bills: Bill[] = await billsService.getBills();

    return (
      <div>
        <h1>List of Bills</h1>
        <ul>
          {bills.map((bill) => (
            <li key={bill.id}>{bill.amount}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return <div>Error fetching bills: </div>;
  }
}
