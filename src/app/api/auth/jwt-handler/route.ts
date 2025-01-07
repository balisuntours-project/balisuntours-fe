import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';

interface Data {
    message?: string;
    error?: string;
}

export async function POST(req: NextRequest) {
    const { token } = await req.json(); // Ambil token dari body request
    console.log(token)
    if (token) {
        const cookieStore = await cookies()
        // Set cookie dengan token JWT yang diterima
        cookieStore.set("assec" as string, token, {
            path: "/",
            domain: process.env.TOP_LEVEL_DOMAIN,
            maxAge : 86400,
          }); 

          console.log(cookieStore.get("assec"))
        return NextResponse.json({ message: 'Token disimpan di cookie' }, { status: 200 });
    } else {
        return NextResponse.json({ error: 'Token tidak ditemukan' }, { status: 400 });
    }
}

    
