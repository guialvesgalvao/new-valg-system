import { Logo } from "@/components/logo";
import { GetStartedBanner } from "./_components/get-started-banner/get-started-banner";
import { ModeToggle } from "./_components/theme-toogle";

interface ILayoutAuthProps {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: Readonly<ILayoutAuthProps>) {
  return (
    <div className="bg-background w-full h-screen flex flex-col md:flex-row items-center justify-start p-6">
      <div className="hidden lg:block w-full h-full">
        <GetStartedBanner
          title="Get started with us"
          subtitle="Create an account to start your journey with us."
          orders={[
            { name: "Sign up your account", order: 1 },
            { name: "Set up your profile", order: 2 },
            {
              name: "Configure your api keys",
              order: 3,
            },
          ]}
        />
      </div>

      <div className="w-full h-full flex items-center justify-center relative">
        <div className="max-w-[800px] w-full h-full">{children}</div>

        <div className="absolute top-4 right-4 lg:hidden">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
