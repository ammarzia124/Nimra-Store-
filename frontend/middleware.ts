import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./src/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only protect /admin routes, but not /admin/login
  if (path.startsWith("/admin") && !path.startsWith("/admin/login") && !path.startsWith("/admin/signup")) {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    const payload = await verifyToken(token);
    
    if (!payload) {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
