import {
  ApiNextCompleteResponse,
  getNextErrorResponse,
} from "@/shared/http/errors";
import { tokenService } from "@/shared/http/factories/token-factory";
import { CreateLongLifeResponse } from "@/shared/http/repositories/token-repository";
import { NextResponse } from "next/server";

export async function POST(): Promise<
  ApiNextCompleteResponse<CreateLongLifeResponse>
> {
  try {
    const response = await tokenService.createLongLife();

    const token = response.data;

    return NextResponse.json(
      {
        success: true,
        message: "Token created successfully!",
        data: token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return getNextErrorResponse(error, 401);
  }
}
