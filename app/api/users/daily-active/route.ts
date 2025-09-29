import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://backend.livquiz.com/prod/api/dashboard/user/daily-active-users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch daily active users." },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
