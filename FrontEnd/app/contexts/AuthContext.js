"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Check if user is logged in from localStorage
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = (username, password) => {
		// Hardcoded credentials check
		if (username === "PS" && password === "PS@1234") {
			const userData = { username: "PS", email: "ps@publicissapient.com" };
			setUser(userData);

			// Store in both localStorage and cookie
			localStorage.setItem("user", JSON.stringify(userData));
			document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`; // 24 hours

			return { success: true };
		}
		return { success: false, error: "Invalid credentials" };
	};

	const signup = (username, email, password) => {
		// For demo purposes, only allow signup if it matches our hardcoded user
		if (username === "PS" && password === "PS@1234") {
			const userData = { username, email };
			setUser(userData);

			// Store in both localStorage and cookie
			localStorage.setItem("user", JSON.stringify(userData));
			document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`;

			return { success: true };
		}
		return {
			success: false,
			error: "Signup is restricted to PS/PS@1234 for demo",
		};
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");

		// Remove cookie
		document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
