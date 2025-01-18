import { DateHelper } from "@/shared/helpers/date-helper";
import { ColumnDef } from "@tanstack/react-table";

export const apiKeysColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell(props) {
      return (
        <div className="flex items-center gap-x-4">
          <p className="text-sm text-appGrey-500 font-normal">
            {props.row.getValue("name")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell(props) {
      return (
        <div className="flex items-center gap-x-4">
          <p className="text-sm text-appGrey-500 font-normal">
            {props.row.getValue("description")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "secret",
    header: "Secret",
    cell(props) {
      return (
        <div className="flex items-center gap-x-4">
          <p className="text-sm text-appGrey-500 font-normal">
            {props.row.getValue("secret")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell({ row }) {
      const date: Date = row.getValue("createdAt");
      const formatted = new DateHelper().getWithInitialMonth(date);

      return (
        <div className="flex items-center gap-x-4">
          <p className="text-sm text-appGrey-500 font-normal">{formatted}</p>
        </div>
      );
    },
  },
];
