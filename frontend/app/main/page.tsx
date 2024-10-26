"use client";

import { Bill } from "@/shared/factories/bills-factory";
import { BillsService } from "@/shared/services/bills-service";
import { useQuery } from "@tanstack/react-query";

export default function BillsPage() {
  const billsService = new BillsService();

  const {
    data: bills,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => await billsService.getBills(),
  });

  if (error) return error;
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
