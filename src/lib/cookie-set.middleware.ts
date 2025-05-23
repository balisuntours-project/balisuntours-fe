//NOTE: ONLY FOR MIDDLEWARE

import { AuthActionServer } from "@/app/action/action.server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const CookieSetForMiddleware = async (
  response: NextResponse<unknown>,
  request: NextRequest,
  loginPage: string
) => {
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
    cookieStore.delete("assec");
    cookieStore.delete("refresh");
    cookieStore.delete("google-login");

    // Jika refresh token gagal, redirect ke halaman login
    return NextResponse.redirect(new URL(loginPage, request.url));
  }
};
