export interface ISession {
    id: number;
    user_id: number;
    acess_token: string | null;
    refresh_token: string | null;
    acess_token_expires_at: Date | null;
    refresh_token_expires_at: Date;
    token_type: string | null;
    modified_at: Date | null;
    created_at: Date;
    revoked: boolean;
  }
  