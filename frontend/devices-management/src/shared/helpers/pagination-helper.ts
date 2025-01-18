import { Table } from "@tanstack/react-table";

export class PaginationHelper<TData> {
  private readonly _table: Table<TData>;

  constructor(table: Table<TData>) {
    this._table = table;

    this.getPages = this.getPages.bind(this);
    this.getPageTotal = this.getPageTotal.bind(this);
    this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.getPreviousIndex = this.getPreviousIndex.bind(this);
    this.getNextIndex = this.getNextIndex.bind(this);
    this.getSidesIndexes = this.getSidesIndexes.bind(this);
    this.getLastIndex = this.getLastIndex.bind(this);
  }

  public getPageTotal(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize);
  }

  public getPages(total: number, pageSize: number): number[] {
    return Array.from({
      length: this.getPageTotal(total, pageSize),
    }).map((_, index) => index + 1);
  }

  public getCurrentIndex(): number {
    return this._table.getState().pagination.pageIndex;
  }

  public getPreviousIndex(): number | undefined {
    const currentIndex = this.getCurrentIndex();

    if (currentIndex === 0) {
      return undefined;
    }

    return this.getCurrentIndex() - 1;
  }

  public getNextIndex(): number {
    const currentIndex = this.getCurrentIndex();

    if (currentIndex === this.getLastIndex()) {
      return this.getLastIndex();
    }

    return this.getCurrentIndex() + 1;
  }

  public getSidesIndexes(): number[] {
    const currentIndex = this.getCurrentIndex();
    const previousIndex = this.getPreviousIndex();
    const nextIndex = this.getNextIndex();

    const pages = [previousIndex, currentIndex, nextIndex];

    return pages.filter((page) => page !== undefined);
  }

  public getLastIndex(): number {
    const pages = this.getPages(
      this._table.getRowCount(),
      this._table.getState().pagination.pageSize
    );

    const lastPage = pages.pop();

    if (lastPage === undefined) {
      return 0;
    }

    return lastPage - 1;
  }

  public getBetweenIndexes(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
}
