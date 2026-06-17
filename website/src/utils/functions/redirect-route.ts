import { NextResponse } from "next/server";

// /api redirect-route factory → the document URL.
export const redirectRoute = (url: string) => () => NextResponse.redirect(url);
