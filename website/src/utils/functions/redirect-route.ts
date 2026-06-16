import { NextResponse } from "next/server";

// /api redirect-route factory: 302 → `url`, 404 if missing, 500 on throw.
export const redirectRoute = (url: string, notFound: string) => async () => {
  try {
    if (!url) {
      return NextResponse.json({ error: notFound }, { status: 404 });
    }
    return NextResponse.redirect(url);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
