import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthActionServer } from "./app/action/action.server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Cocokkan route yang perlu login dan memakai SSR untuk fetch api
  if (request.nextUrl.pathname == "/customer/cart") {
    const token = request.cookies.get("assec")?.value;

    if (!token) {
      const result = await AuthActionServer.RefreshToken();

      if (result.access_token) {
        response.cookies.set("assec", result.access_token.value, {
          path: "/",
          maxAge: result.access_token.ttl,
          httpOnly: result.access_token.http_only ? true : false,
          secure: result.access_token.secure ? true : false,
          sameSite: "lax",
        });
        response.cookies.set("refresh", result.refresh_token.value, {
          path: "/",
          maxAge: result.refresh_token.ttl,
          httpOnly: result.access_token.http_only ? true : false,
          secure: result.access_token.secure ? true : false,
          sameSite: "lax",
        });

        return response;
      } else {
        // Jika refresh token gagal, redirect ke halaman login
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return response;
}
