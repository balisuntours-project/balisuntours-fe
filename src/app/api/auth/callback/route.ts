import api from '@/lib/axios-instance';
import { CookieResponseType } from '@/lib/global.type';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const urlParams = req.nextUrl.searchParams;
    
    const code = urlParams.get('code'); // Mendapatkan kode dari URL
    const scope = urlParams.get('scope'); // Mendapatkan kode dari URL
    const authuser = urlParams.get('authuser'); // Mendapatkan kode dari URL
    const prompt = urlParams.get('prompt'); // Mendapatkan kode dari URL
    
    const cookieStore = await cookies()
   
    try {
        const response = await api.get(`/customer/auth/jwt/google/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`);
      
        console.log(response.data)

        const result : CookieResponseType = response.data
        cookieStore.set("assec", result.access_token.value, {
            path: "/",
            maxAge: result.access_token.ttl,
            httpOnly: result.access_token.http_only ? true : false,
            secure: result.access_token.secure ? true : false,
            sameSite: "lax"
          });

          cookieStore.set("refresh", result.refresh_token.value, {
            path: "/",
            maxAge: result.refresh_token.ttl,
            httpOnly: result.refresh_token.http_only ? true : false,
            secure: result.refresh_token.secure ? true : false,
            sameSite: "lax"
          });

          cookieStore.set("google-login", result['google-login'].value, {
            path: "/",
            maxAge: result['google-login'].ttl,
            httpOnly: result['google-login'].http_only ? true : false,
            secure: result['google-login'].secure ? true : false,
            sameSite: "lax"
          });
          
    } catch (error) {
        console.error('Error:', error);
    }
    
    
    return NextResponse.json({ message: 'Success login', data: "ok" }, { status: 200 });
}

