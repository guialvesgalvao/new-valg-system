export const AppPath = {
  ROOT: "/",

  // Rotas de autenticação
  Login: "/auth/login",
  Register: "/auth/register",
  ForgotPassword: "/auth/forgot-password",

  // Rotas principais do dashboard
  Dashboard: "/dashboard",
  Devices: "/devices",
} as const;

// Tipo inferido para garantir segurança ao usar as rotas
export type AppPathType = (typeof AppPath)[keyof typeof AppPath];
