import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthActionServer } from "./app/action/action.server";
import { cookies } from "next/headers";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Cocokkan route yang perlu login dan memakai SSR untuk fetch api
  if (
    request.nextUrl.pathname == "/customer/cart" ||
    request.nextUrl.pathname == "/customer/booking/airport-transfer/transaction" ||
    request.nextUrl.pathname == "/customer/booking/activities/transaction" ||
    request.nextUrl.pathname == "/customer/booking/activities/unconfirmed" ||
    request.nextUrl.pathname == "/customer/checkout" ||
    request.nextUrl.pathname == "/customer/airport-transfer/checkout" 
  ) {
    const token = request.cookies.get("assec")?.value;

    if (!token) {
      const result = await AuthActionServer.RefreshToken();

      if (result.access_token) {
        response.cookies.set("assec", result.access_token.value, {
          path: "/",
          domain: process.env.TOP_LEVEL_DOMAIN,
          maxAge: result.access_token.ttl,
          httpOnly: result.access_token.http_only ? true : false,
          secure: result.access_token.secure ? true : false,
          sameSite: "lax",
        });
        response.cookies.set("refresh", result.refresh_token.value, {
          path: "/",
          domain: process.env.TOP_LEVEL_DOMAIN,
          // maxAge: result.refresh_token.ttl,
          // httpOnly: result.access_token.http_only ? true : false,
          // secure: result.access_token.secure ? true : false,
          maxAge: result.refresh_token.ttl,
          httpOnly: result.refresh_token.http_only ? true : false,
          secure: result.refresh_token.secure ? true : false,
          sameSite: "lax",
        });
        response.cookies.set("google-login", result["google-login"].value, {
          path: "/",
          domain: process.env.TOP_LEVEL_DOMAIN,
          maxAge: result["google-login"].ttl,
          httpOnly: result["google-login"].http_only ? true : false,
          secure: result["google-login"].secure ? true : false,
          sameSite: "lax",
        });

        return response;
      } else {
        //hapus cookie2
        const cookieStore = await cookies();
        cookieStore.delete("assec")
        cookieStore.delete("refresh")
        cookieStore.delete("google-login")
        
        // Jika refresh token gagal, redirect ke halaman login
        return NextResponse.redirect(new URL("/customer/signin", request.url));
      }
    }
  }

  if (
    request.nextUrl.pathname == "/customer/signup" ||
    request.nextUrl.pathname == "/customer/signin" ||
    request.nextUrl.pathname == "/internal/signin"
  ) {
    const token = request.cookies.get("assec")?.value;

    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return response;
    }
  }

  return response;
}
