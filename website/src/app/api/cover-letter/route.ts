import { coverLetter } from "@/utils/constants/data";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    if (!coverLetter) {
      return NextResponse.json(
        { error: "Cover letter not found" },
        { status: 404 }
      );
    }

    return NextResponse.redirect(coverLetter);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
