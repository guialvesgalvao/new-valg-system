import { BillStatus } from "../../../shared/interfaces/bills";

export interface ITileProps {
    backgroundColor: string;
    hoverColor: string;
    counter: number;
    url?: string;
    statusToSet?: BillStatus;
    title: string;
    borderColor: string;
    fontColor?: string;
  }

export function Tile (props: ITileProps) {

    const { backgroundColor, hoverColor, url, statusToSet, title, borderColor, fontColor } = props;

    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}