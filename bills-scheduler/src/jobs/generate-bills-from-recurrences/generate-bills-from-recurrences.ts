import cron from "node-cron";
import logger from "../../utils/logger/logger";

import { billRecurrenceService } from "../../modules/bill-recurrence/factories/bill-recurrence-factory";
import { getDueDate } from "../../utils/due-date-utils/due-date-utils";
import { CreateBillType } from "../../modules/bill/validations/bill-validations";
import { billService } from "../../modules/bill/factories/bill-factory";
import { BillRecurrence } from "@prisma/client";

async function processRecurrence(recurrence: BillRecurrence): Promise<void> {
  const dueDate = getDueDate(recurrence.dayOfDue);

  const bill: CreateBillType = {
    name: recurrence.name,
    amount: recurrence.averageAmount.toNumber(),
    dueDate,
    status: "Pending",
    user: recurrence.user,
    isGeneratedByRecurrence: true
  };

  try {
    const billId = await billService.createBill(bill);
    logger.info(
      `Bill generated from recurrence ${recurrence.id} with id ${billId}`
    );
  } catch (error) {
    logger.error(
      `Failed to generate bill from recurrence ${recurrence.id}: ${error}`
    );
  }
}

export async function generateBillsFromRecurrences() {
  try {
    const enabledRecurrences =
      await billRecurrenceService.getEnabledAndDueBillRecurrences();

    logger.info(`Found ${enabledRecurrences.length} recurrences to process.`);

    await Promise.all(enabledRecurrences.map(processRecurrence));
  } catch (error) {
    logger.error("Error to generate bills from recurrences", error);
  }
}

async function executeRecurrenceJob() {
  logger.info("Running job to generate bills from recurrences");
  await generateBillsFromRecurrences();
}

// Run every minute to test the job
cron.schedule("* * * * *", executeRecurrenceJob, {
  timezone: "America/Sao_Paulo"
});
