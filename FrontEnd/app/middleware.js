import { NextResponse } from "next/server";

export function middleware(request) {
	const path = request.nextUrl.pathname;
	const isPublicPath = path === "/login" || path === "/signup";
	const token = request.cookies.get("user")?.value || "";

	// Redirect to login if accessing protected route without auth
	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Redirect to home if accessing login/signup while authenticated
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: [
		"/",
		"/matches",
		"/insights",
		"/analytics",
		"/settings",
		"/login",
		"/signup",
	],
};
