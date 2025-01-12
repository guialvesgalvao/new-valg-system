import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="bg-background w-full h-full flex flex-col items-center justify-center">
      <LoadingSpinner className="w-14 h-14" />
      <p className="text-base font-medium">Loading...</p>
    </div>
  );
}
