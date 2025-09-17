import React from "react";

export default function StartUp() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<h1 className="text-3xl font-bold mb-4">Welcome to QuickCash!</h1>
			<p className="text-lg text-gray-700 mb-6">Get started by signing up or logging in.</p>
			<div className="flex gap-4">
				<a href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</a>
				<a href="/login" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Log In</a>
			</div>
		</div>
	);
}
