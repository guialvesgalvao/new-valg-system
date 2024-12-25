export function getDueDate(day: number): Date {
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error(
      "Invalid day provided. Day must be an integer between 1 and 31."
    );
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Cria a data com base no dia fornecido
  let dueDate = new Date(currentYear, currentMonth, day);

  // Se a data gerada já passou neste mês, ajusta para o próximo mês
  if (dueDate < today) {
    const nextMonth = currentMonth + 1;
    dueDate = new Date(currentYear, nextMonth, day);
  }

  return dueDate;
}
