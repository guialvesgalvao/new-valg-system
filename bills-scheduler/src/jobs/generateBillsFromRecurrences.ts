import cron from "node-cron";

import { billRecurrenceService } from "../modules/bill-recurrence/factories/bill-recurrence-factory";
import { getDueDate } from "../utils/due-date-utils/due-date-utils";

export async function generateBillsFromRecurrences() {
  try {
    const enabledRecurrences =
      await billRecurrenceService.getEnabledAndDueBillRecurrences();

    for (const recurrence of enabledRecurrences) {
      const dueDate = getDueDate(recurrence.dayOfDue);

      // await billService.createBill({
      //   name: recurrence.name,
      //   amount: recurrence.averageAmount.toNumber(),
      //   dueDate,
      //   status: "Pending",
      //   user: recurrence.user,
      //   isGeneratedByRecurrence: true,
      // });

      console.log(recurrence);
    }
  } catch (error) {
    console.error(error);
  }
}

// Agendar o job para rodar no dia 1 de cada mês à meia-noite
cron.schedule("* * * * *", async () => {
  console.log("Executando job de geração de Bills...");
  await generateBillsFromRecurrences();
});
