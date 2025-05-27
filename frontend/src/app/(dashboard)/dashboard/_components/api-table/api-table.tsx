"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useState, useEffect } from "react";
import { apiKeysColumns } from "./api-table-columns";
import { OTPDialog } from "@/components/alert-dialogs/otp-dialog";

export function ApiTable() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DataTable
        id="api-table"
        columns={apiKeysColumns}
        data={[]}
        defaultSorting={[
          {
            id: "createdAt",
            desc: true,
          },
        ]}
      />
    </>
  );
}
