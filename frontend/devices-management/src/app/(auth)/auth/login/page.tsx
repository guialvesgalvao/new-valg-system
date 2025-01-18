import { AppPath } from "@/path";

import { LoginForm } from "@/components/forms/login-form";
import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../../../../components/redirect-text";
import { AuthPageContent } from "../_components/auth-page-content";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const refreshToken = await cookies().then((response) => {
    return response.get("refreshToken");
  });

  console.log("refreshToken", refreshToken);

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
