import { getDueDate } from "./due-date-utils";

describe("due-date-utils", () => {
  it("should return the correct due date", () => {
    const dueDate = getDueDate(1);
    expect(dueDate.getDate()).toBe(1);
  });

  it("should return the correct due date when the day is 31", () => {
    const dueDate = getDueDate(31);
    expect(dueDate.getDate()).toBe(31);
  });

  it("should return the correct due date when the day is 29", () => {
    const dueDate = getDueDate(29);
    expect(dueDate.getDate()).toBe(29);
  });

  it("should return the correct due date when the day is 30", () => {
    const today = new Date();

    const date = new Date(today.getFullYear(), today.getMonth(), 30);
    const dueDate = getDueDate(30);

    expect(date).toStrictEqual(dueDate);
  });
});
