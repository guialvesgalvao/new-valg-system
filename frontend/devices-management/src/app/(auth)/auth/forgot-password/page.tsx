import { AppPath } from "@/path";

import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../../../../components/redirect-text";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { AuthPageContent } from "../_components/auth-page-content";

export default function ForgotPassword() {
  return (
    <AuthPageContent>
      <AuthTitle
        title="Forgot password?"
        subtitle="Enter your email to reset your password."
      />

      <ForgotPasswordForm />

      <p className="text-sm text-muted-foreground font-medium">
        Remember your password?{" "}
        <RedirectText href={AppPath.Login}>Log in</RedirectText>
      </p>
    </AuthPageContent>
  );
}
