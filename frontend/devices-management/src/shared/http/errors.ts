import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export interface ApiNextResponse<T> {
  success: true;
  message?: string;
  data?: T;
}
export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiNextCompleteResponse<T> = NextResponse<
  ApiNextResponse<T> | ApiErrorResponse
>;

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export function getNextErrorResponse(
  error: unknown,
  statusCode = 500
): NextResponse<ApiErrorResponse> {
  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, message: error.message || "An error occurred" },
      { status: statusCode }
    );
  }

  if (error instanceof AxiosError) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data.message || "An error occurred",
      },
      {
        status: error.response?.status || statusCode,
      }
    );
  }

  return NextResponse.json(
    { success: false, message: "An error occurred" },
    { status: statusCode }
  );
}
