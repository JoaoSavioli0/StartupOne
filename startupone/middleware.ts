import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("communityon_user-token")?.value;
  // const publicPaths = ["/login"];

  // const isPublicPath = publicPaths.find((path) =>
  //   req.nextUrl.pathname.startsWith(path)
  // );

  // if (!token && !isPublicPath) {
  //   return Response.redirect(new URL("/login", req.url));
  // }

  // if (token && isPublicPath) {
  //   return Response.redirect(new URL("/home", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|assets|public).*)"],
};
