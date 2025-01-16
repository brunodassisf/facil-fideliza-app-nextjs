import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionStore } from "./core/lib/session";

const publicRoutes = ["/login", "/cadastro", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  if (!isPublicRoute) {
    const user = await getIronSession<SessionStore>(await cookies(), {
      password: process.env.SECRET_KEY!,
      cookieName: "ff-session",
    });
    if (user.role !== "STORE" && req.nextUrl.pathname.startsWith("/loja")) {
      user.destroy();
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // if (
    //   session &&
    //   session.role === "STORE" &&
    //   !req.nextUrl.pathname.startsWith("/loja")
    // ) {
    //   session.destroy();
    //   return NextResponse.redirect(new URL("/login", req.nextUrl));
    // }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
