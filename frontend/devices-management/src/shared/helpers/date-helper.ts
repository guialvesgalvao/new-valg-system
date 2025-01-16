import { format } from "date-fns";

export class DateHelper {
  public getWithInitialMonth(date: Date): string {
    return format(date, "dd MMM yyyy");
  }
}
