import { ApiTable } from "./_components/api-table/api-table";
import { CreateApiDialog } from "@/components/dialogs/create-api-dialog";

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col px-6 py-8 gap-y-8">
      <header className="w-full flex items-center justify-between gap-x-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-primary text-2xl">APIs</h1>
          <p className="text-appGrey-500 text-accent-foreground font-medium text-sm">
            Manage your APIs and secrets
          </p>
        </div>

        <CreateApiDialog />
      </header>

      <main className="w-full h-full">
        <ApiTable />
      </main>
    </div>
  );
}
