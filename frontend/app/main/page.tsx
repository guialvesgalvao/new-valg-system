"use client";

import { BillsService } from "@/shared/services/bills-service";
import { useQuery } from "@tanstack/react-query";

export default function BillsPage() {
  const billsService = new BillsService();

  const {
    data: bills,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => await billsService.getBills(),
  });

  if (isError) return <div>Erro na aplicação</div>;

  if (isLoading) return "Loading...";

  return (
    <div>
      <h1>List of Bills</h1>
      <ul>
        {bills?.map((bill) => (
          <li key={bill.id}>{bill.amount}</li>
        ))}
      </ul>
    </div>
  );
}
