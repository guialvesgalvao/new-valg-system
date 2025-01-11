import { LoginForm } from "@/components/forms/login-form";
import { AuthTitle } from "../_components/auth-title";
import { RedirectText } from "../_components/redirect-text";
import { AppPath } from "@/path";

export default function LoginPage() {
  return (
    <div className="max-w-[1600px] w-full h-full flex gap-x-10">
      <div className="w-full h-full rounded-3xl shadow-lg border"></div>

      <div className="w-full h-full flex flex-col items-center justify-center px-10 py-10 gap-y-6">
        <AuthTitle
          title="Log in"
          subtitle="Enter your credentials to continue."
        />

        <LoginForm />

        <p className="text-sm text-muted-foreground font-medium">
          Don't have an account?{" "}
          <RedirectText href={AppPath.Register}>Sign up</RedirectText>
        </p>
      </div>
    </div>
  );
}
