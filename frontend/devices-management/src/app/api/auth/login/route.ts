import { NextRequest, NextResponse } from "next/server";
import {
  getNextErrorResponse,
  STATUS_CODES,
} from "../../../../shared/http/errors";
import { authService } from "@/shared/http/factories/auth-factory";
import { LoginRepositoryParams } from "@/shared/http/repositories/auth-repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as LoginRepositoryParams;

    const response = await authService.login({ email, password });

    const cookies = response.headers["set-cookie"];

    const serverResponse = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully!",
      },
      {
        status: STATUS_CODES.OK,
        statusText: "OK",
      }
    );

    cookies?.forEach((cookie) => {
      serverResponse.headers.append("Set-Cookie", cookie);
    });

    return serverResponse;
  } catch (error) {
    return getNextErrorResponse(error);
  }
}
