import { AppPath } from "@/path";

import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../_components/redirect-text";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="max-w-[1600px] w-full h-full flex gap-x-10">
      <div className="w-full h-full rounded-3xl shadow-lg border"></div>

      <div className="w-full h-full flex flex-col items-center justify-center px-10 py-10 gap-y-6">
        <AuthTitle
          title="Forgot password?"
          subtitle="Enter your email to reset your password."
        />

        <ForgotPasswordForm />

        <p className="text-sm text-muted-foreground font-medium">
          Remember your password?{" "}
          <RedirectText href={AppPath.Login}>Log in</RedirectText>
        </p>
      </div>
    </div>
  );
}
