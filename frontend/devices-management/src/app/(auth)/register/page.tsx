import { AppPath } from "@/path";

import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../_components/redirect-text";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 py-10 gap-y-4">
      <AuthTitle
        title="Sign up Account"
        subtitle="Enter your personal details to create an account."
      />

      <RegisterForm />

      <p className="text-sm text-muted-foreground font-medium">
        Already have an account?{" "}
        <RedirectText href={AppPath.Login}>Log in</RedirectText>
      </p>
    </div>
  );
}