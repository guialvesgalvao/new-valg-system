import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { CreateLongLifeResponse } from "@/shared/http/repositories/token-repository";

interface OTPDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  otp?: CreateLongLifeResponse;
}

export function OTPDialog(props: Readonly<OTPDialogProps>) {
  const { isOpen, setIsOpen, otp } = props;

  function getMinutesByDate(iso?: string) {
    if (!iso) return 0;

    const date = new Date(iso);
    const now = new Date();

    return Math.abs(date.getTime() - now.getTime()) / 60000;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="flex flex-col gap-y-4">
        <AlertDialogTitle>OTP Code</AlertDialogTitle>
        <AlertDialogDescription>
          Please use this OTP code to verify your account.
        </AlertDialogDescription>

        <div className="w-full flex flex-col items-center justify-center gap-y-4">
          <p className="text-primary text-lg font-semibold">
            This code will expire in{" "}
            {Math.floor(getMinutesByDate(otp?.OTPExpiresDate))} minutes
          </p>

          <InputOTP value={otp?.OTPCode?.toString()} maxLength={6} readOnly>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <AlertDialogCancel>Close</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
