export function generateDateForExpire(minutes: number): Date {
  const dateNow = new Date();
  dateNow.setMinutes(dateNow.getMinutes() + minutes);

  return dateNow;
}
