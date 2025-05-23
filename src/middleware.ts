import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthActionServer } from "./app/action/action.server";
import { cookies } from "next/headers";
import { CookieSetForMiddleware } from "./lib/cookie-set.middleware";
import { notFound } from "next/navigation";


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
    request.nextUrl.pathname == "/customer/airport-transfer/checkout" ||
    request.nextUrl.pathname == "/customer/activities/transaction-status" ||
    request.nextUrl.pathname == "/customer/airport-transfer/transaction-status" 
  ) {
    const token = request.cookies.get("assec")?.value;

    if (!token) {
       return CookieSetForMiddleware(response, request, "/customer/signin")
    }
  }

  if (
    request.nextUrl.pathname == "/admin/airport-transfer/vehicle/store" ||
    request.nextUrl.pathname == "/admin/airport-transfer/vehicle/edit" ||
    request.nextUrl.pathname == "/admin/free-voucher/attach"
  ) {
    const token = request.cookies.get("assec")?.value;

    if(token) {
      const resultUser = await AuthActionServer.GetUserRole();
      if(resultUser.role != "admin") {
       return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (!token) {
        return  CookieSetForMiddleware(response, request, "/internal/signin")
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
