import { api } from "@/lib/axios-instance";
import { CookieResponseType } from "@/lib/global.type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const urlParams = req.nextUrl.searchParams;

  const code = urlParams.get("code"); // Mendapatkan kode dari URL
  const scope = urlParams.get("scope"); // Mendapatkan kode dari URL
  const authuser = urlParams.get("authuser"); // Mendapatkan kode dari URL
  const prompt = urlParams.get("prompt"); // Mendapatkan kode dari URL

  const cookieStore = await cookies();

  try {
    const response = await api(
      `/customer/auth/jwt/google/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`,
      {
        method: "GET",
      }
    );

    const result: CookieResponseType = await response.json();
    cookieStore.set("assec", result.access_token.value, {
      path: "/",
      domain: process.env.TOP_LEVEL_DOMAIN,
      maxAge: result.access_token.ttl,
      httpOnly: result.access_token.http_only ? true : false,
      secure: result.access_token.secure ? true : false,
      sameSite: "lax",
    });

    cookieStore.set("refresh", result.refresh_token.value, {
      path: "/",
      domain: process.env.TOP_LEVEL_DOMAIN,
      maxAge: result.refresh_token.ttl,
      httpOnly: result.refresh_token.http_only ? true : false,
      secure: result.refresh_token.secure ? true : false,
      sameSite: "lax",
    });
    cookieStore.set(
      result.session_token.name ?? "bali_sun_tours_session",
      result.session_token.value,
      {
        path: "/",
        domain: process.env.TOP_LEVEL_DOMAIN,
        maxAge: result.session_token.ttl,
        httpOnly: result.session_token.http_only ? true : false,
        secure: result.session_token.secure ? true : false,
        sameSite: "lax",
      }
    );

    cookieStore.set("google-login", result["google-login"].value, {
      path: "/",
      domain: process.env.TOP_LEVEL_DOMAIN,
      maxAge: result["google-login"].ttl,
      httpOnly: result["google-login"].http_only ? true : false,
      secure: result["google-login"].secure ? true : false,
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Error:", error);
  }

  return NextResponse.json(
    // { message: "Success login, close the page" /* status_code: 200 */ },
    { status: 200 }
  );
}
