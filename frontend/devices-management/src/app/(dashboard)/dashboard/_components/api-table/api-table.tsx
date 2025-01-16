"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useState, useEffect } from "react";
import { apiKeysColumns } from "./api-table-columns";

export function ApiTable() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DataTable
      id="api-table"
      columns={apiKeysColumns}
      data={[
        {
          name: "Test API",
          type: "REST",
          description: "A test API",
          secret: "123456",
          createdAt: new Date(),
        },
        {
          name: "Test API 2",
          type: "GraphQL",
          description: "Another test API",
          secret: "654321",
          createdAt: new Date(),
        },
      ]}
      defaultSorting={[
        {
          id: "createdAt",
          desc: true,
        },
      ]}
    />
  );
}
