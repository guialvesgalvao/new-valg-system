import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { AppPath } from "@/path";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[600px] flex flex-col gap-6 px-6">
        <div className="flex flex-col gap-2 items-center">
          <SearchX className="text-destructive w-20 h-20 md:w-32 md:h-32" />
          <h1 className="text-xl md:text-2xl font-medium text-center mt-4">
            Page not found
          </h1>
          <p className="text-xs md:text-base text-center text-muted-foreground">
            This page does not exist or has been removed. Please check the URL
            or go back to the home page.
          </p>
        </div>

        <Link
          className={buttonVariants({
            variant: "default",
            className: "w-full mt-4",
          })}
          href={AppPath.ROOT}
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}
