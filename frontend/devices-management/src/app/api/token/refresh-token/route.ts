// app/api/token/refresh-token/route.ts
import { tokenService } from "@/shared/http/factories/token-factory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1) Ler o refreshToken do cookie original
    const refreshCookie = request.cookies.get("refreshToken");
    if (!refreshCookie) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const refreshTokenValue = refreshCookie.value;

    // 2) Chamar sua lógica de refresh (API externa ou interna)
    //    Supondo que ela retorne { accessToken, refreshToken }
    const response = await tokenService.refreshToken(refreshTokenValue);
    const { token } = response.data;

    // 3) Montar a resposta do Next
    const serverResponse = NextResponse.json({
      success: true,
      newAccessToken: token,
      // Se quiser também mandar no body
    });

    // 4) Definir os novos cookies no serverResponse
    //    Ajuste as opções (secure, sameSite, etc.) conforme seu ambiente e requisitos
    serverResponse.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: false, // Em dev local HTTP, use false. Em produção, use true + HTTPS
      path: "/",
      sameSite: "lax", // ou "strict", ou "none" se precisar cross-site
    });

    serverResponse.cookies.set("refreshToken", refreshTokenValue, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    // 5) Retornar a resposta ao navegador
    return serverResponse;
  } catch (err) {
    return NextResponse.json({ error: "Refresh failed" }, { status: 400 });
  }
}
