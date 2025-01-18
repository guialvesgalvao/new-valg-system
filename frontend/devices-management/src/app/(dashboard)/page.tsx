"use client";

import { AppPath } from "@/path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(AppPath.Login);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page content</p>
    </div>
  );
}
