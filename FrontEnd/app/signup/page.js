"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { signup } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		const result = signup(username, email, password);
		if (result.success) {
			router.push("/");
		} else {
			setError(result.error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
			<div className="flex bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full">
				{/* Left Panel - Branding */}
				<div className="hidden md:block w-1/2 bg-gradient-to-br from-red-900 to-red-600 p-12 text-white">
					<div className="h-full flex flex-col justify-center items-center">
						<Image
							src="/assets/pslogo.svg"
							alt="Publicis Sapient"
							width={300}
							height={150}
							className="max-w-full"
						/>
					</div>
				</div>

				{/* Right Panel - Signup Form */}
				<div className="w-full md:w-1/2 p-8 md:p-12">
					<div className="max-w-md mx-auto">
						<h1 className="text-2xl font-semibold mb-2">Create Account</h1>
						<p className="text-gray-600 mb-8">Sign up for a new account</p>

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Username */}
							<div>
								<label
									htmlFor="signup-username"
									className="block text-sm font-medium text-gray-700 mb-2">
									Username
								</label>
								<input
									id="signup-username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
									placeholder="Choose a username"
									required
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2">
									Email
								</label>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
									placeholder="Enter your email"
									required
								/>
							</div>

							{/* Password */}
							<div>
								<label
									htmlFor="signup-password"
									className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative">
									<input
										id="signup-password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
										placeholder="Create a password"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}>
										{showPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div>
								<label
									htmlFor="confirm-password"
									className="block text-sm font-medium text-gray-700 mb-2">
									Confirm Password
								</label>
								<div className="relative">
									<input
										id="confirm-password"
										type={showConfirmPassword ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
										placeholder="Confirm your password"
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
										aria-label={
											showConfirmPassword
												? "Hide confirm password"
												: "Show confirm password"
										}>
										{showConfirmPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
									{error}
								</div>
							)}

							{/* Signup Button */}
							<button
								type="submit"
								className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
								Sign Up
							</button>

							{/* Login link */}
							<div className="text-center">
								<span className="text-gray-600">Already have an account? </span>
								<Link
									href="/login"
									className="text-red-600 hover:text-red-700 font-medium">
									Login
								</Link>
							</div>
						</form>

						{/* Terms and Privacy */}
						<div className="mt-8 text-center text-xs text-gray-500">
							By signing up, you agree to our{" "}
							<Link href="https://psaisuite.com/tnc" className="underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="https://psaisuite.com/privacy" className="underline">
								Privacy Policy
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
