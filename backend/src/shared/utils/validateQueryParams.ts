export function validateQueryParams (params: Record<string, string>, rules: Record<string, (value: any) => boolean>) {
    for (const [key, rule] of Object.entries(rules)) {
      if (params[key] !== undefined && !rule(params[key])) {
        throw new Error(`Invalid parameter '${key}': ${params[key]}`);
      }
    }
  };
  