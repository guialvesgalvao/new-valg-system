export function getBillMetadataToUpdate(data: any) {

    const fieldMap = {
      name: "name",
      amount: "amount",
      due_date: "due_date",
      status: "status",
      isRecurring: "is_generated_by_recurrence"
    };
  
    const fieldsToUpdate: string[] = [];
    const metadataValues = [];
  
    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        if (key === "isRecurring") {
          fieldsToUpdate.push(`${dbField} = ?`);
          metadataValues.push(data[key] ? 1 : 0);
        } else {
          fieldsToUpdate.push(`${dbField} = ?`);
          metadataValues.push(data[key]);
        }
      }
    }
  
    return {
      fieldsToUpdate,
      metadataValues
    }
  }