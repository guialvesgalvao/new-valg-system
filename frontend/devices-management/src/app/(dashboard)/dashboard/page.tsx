"use client";

import { OTPDialog } from "@/components/alert-dialogs/otp-dialog";
import { ApiTable } from "./_components/api-table/api-table";
import { CreateApiDialog } from "@/components/dialogs/create-api-dialog";
import { useState } from "react";
import { CreateLongLifeResponse } from "@/shared/http/repositories/token-repository";

export default function DashboardPage() {
  const [otp, setOTP] = useState<CreateLongLifeResponse | undefined>();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col px-6 py-8 gap-y-8">
      <header className="w-full flex items-center justify-between gap-x-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-primary text-2xl">Secret</h1>
          <p className="text-appGrey-500 text-accent-foreground font-medium text-sm">
            Manage your Secrets
          </p>
        </div>

        <CreateApiDialog
          onSave={(data) => {
            setOTP(data);
            setIsOtpModalOpen(true);
          }}
        />
      </header>

      <main className="w-full h-full">
        <OTPDialog
          otp={otp}
          isOpen={isOtpModalOpen}
          setIsOpen={setIsOtpModalOpen}
        />
        <ApiTable />
      </main>
    </div>
  );
}
