import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppPath } from "./path";

export function middleware(req: NextRequest) {
  // Obter o token do cabeçalho ou dos cookies
  const token = req.cookies.get("accessToken");

  // Verificar se o token existe
  if (!token) {
    return NextResponse.redirect(new URL(AppPath.Login, req.url));
  }

  // Aqui você pode adicionar lógica adicional para validar o token
  // como verificar se ele não expirou, etc.

  return NextResponse.next();
}

// Configurar rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Rotas protegidas
};
