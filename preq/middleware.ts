import { Playwrite_BE_VLG } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

let reqCount = 0;
export function middleware (req: NextRequest,){
 reqCount++;
 const res = NextResponse.next()
 console.log("recount is ",reqCount)
 return res;
}

export const config={
    matcher: "/api/:path*",
}