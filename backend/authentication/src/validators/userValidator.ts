import { userSchema } from "../schemas/userSchema";

export function userValidator(data: Record<string, unknown>): { error: string } | null {
    const result = userSchema.safeParse(data);
  
    if (!result.success) {
      return { error: result.error.errors.map(err => err.message).join(', ') };
    }
  
    return null;
  }
  
