import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="bg-background w-full h-screen flex flex-col items-center justify-center">
      <LoadingSpinner className="w-20 h-20" />
      <p className="text-base font-medium">Loading application data...</p>
    </div>
  );
}
