import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const user = request.cookies.get("user")?.value;
    const pathname = request.nextUrl.pathname;

    // Jika pengguna mencoba mengakses halaman auth tapi sudah login
    if (token && user && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
        const parsedUser = JSON.parse(user);
        return NextResponse.redirect(new URL(parsedUser.role === "admin" ? "/admin" : "/user", request.url));
    }

    // Jika pengguna mencoba mengakses halaman protected tapi belum login
    if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Jika pengguna mencoba mengakses halaman admin tapi bukan admin
    if (token && user && pathname.startsWith("/admin") && JSON.parse(user).role !== "admin") {
        return NextResponse.redirect(new URL("/user", request.url));
    }

    // Jika pengguna mencoba mengakses halaman user tapi bukan user
    if (token && user && pathname.startsWith("/user") && JSON.parse(user).role !== "user") {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};