import { resumes } from "@/utils/constants/data";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // The latest resume is the first item in the array (index 0)
    const latestResume = resumes[0];

    if (!latestResume) {
      return NextResponse.json(
        {
          error: "No resume found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.redirect(latestResume.resume);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
