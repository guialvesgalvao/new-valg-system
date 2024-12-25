export function getDueDate(day: number): Date {
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), day);

  return date;
}
