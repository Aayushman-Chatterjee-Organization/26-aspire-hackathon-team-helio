import { NextResponse } from "next/server";

export function middleware(request) {
	const path = request.nextUrl.pathname;
	const isPublicPath = path === "/login" || path === "/signup";

	// Check for user in cookies (localStorage isn't accessible in middleware)
	const userCookie = request.cookies.get("user");
	const isAuthenticated = !!userCookie;

	// Redirect to login if accessing protected route without auth
	if (!isPublicPath && !isAuthenticated) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	// Redirect to home if accessing login/signup while authenticated
	if (isPublicPath && isAuthenticated) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
	],
};
