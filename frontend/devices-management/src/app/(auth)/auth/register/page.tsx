import { AppPath } from "@/path";

import { RegisterForm } from "@/components/forms/register-form";
import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../../../../components/redirect-text";
import { AuthPageContent } from "../_components/auth-page-content";

export default function RegisterPage() {
  return (
    <AuthPageContent>
      <AuthTitle
        title="Sign up Account"
        subtitle="Enter your personal details to create an account."
      />

      <RegisterForm />

      <p className="text-sm text-muted-foreground font-medium">
        Already have an account?{" "}
        <RedirectText href={AppPath.Login}>Log in</RedirectText>
      </p>
    </AuthPageContent>
  );
}
