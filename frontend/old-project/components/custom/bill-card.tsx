import { IBill } from "@/shared/interface/IBill";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BillCard({ amount }: Readonly<IBill>) {
  return (
    <Card className="flex flex-col items-center ">
      <CardHeader>
        <CardTitle className="bold text-md">Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>R$ {amount}</p>
      </CardContent>
    </Card>
  );
}
