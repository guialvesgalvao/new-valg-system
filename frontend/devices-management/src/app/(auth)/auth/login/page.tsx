import { AppPath } from "@/path";

import { LoginForm } from "@/components/forms/login-form";
import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../../../../components/redirect-text";
import { AuthPageContent } from "../_components/auth-page-content";

export default function LoginPage() {
  return (
    <AuthPageContent>
      <AuthTitle
        title="Log in"
        subtitle="Enter your credentials to continue."
      />

      <LoginForm />

      <p className="text-sm text-muted-foreground font-medium">
        Don&#39;t have an account?{" "}
        <RedirectText href={AppPath.Register}>Sign up</RedirectText>
      </p>
    </AuthPageContent>
  );
}
