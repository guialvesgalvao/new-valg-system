export function getObjectMetadata<
  T extends {
    [key: string]: string;
  }
>(data: T, fieldMap: T) {
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
  };
}
