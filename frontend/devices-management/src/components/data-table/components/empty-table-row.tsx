import { TableRow } from "../../ui/table";

interface IEmptyTableRowProps {
  columnsLength: number;
  message: string;
}

export function EmptyTableRow(props: Readonly<IEmptyTableRowProps>) {
  const { columnsLength, message } = props;

  return (
    <TableRow>
      <td colSpan={columnsLength} className="py-20 text-center">
        <h2 className="text-lg md:text-xl">{message}</h2>
      </td>
    </TableRow>
  );
}
