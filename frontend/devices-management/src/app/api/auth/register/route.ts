import { NextRequest, NextResponse } from "next/server";
import { getNextErrorResponse, STATUS_CODES } from "@/shared/http/errors";

import { RegisterServiceParams } from "@/shared/http/services/auth-service";
import { authService } from "@/shared/http/factories/auth-factory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone, confirmPassword } =
      body as RegisterServiceParams;

    await authService.register({
      email,
      password,
      name,
      phone,
      confirmPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registered successfully!",
      },
      {
        status: STATUS_CODES.CREATED,
        statusText: "Created",
      }
    );
  } catch (error) {
    return getNextErrorResponse(error);
  }
}
