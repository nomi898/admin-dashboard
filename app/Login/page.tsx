"use client";

import React from "react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#4f8bff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Login to Account</h1>
          <p className="text-sm text-gray-600 mt-1">
            Please enter your email and password to continue
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email address:</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="flex items-center justify-between mb-1">
              <div />
              <Link href="#" className="text-xs text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="•••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded border-gray-300 text-blue-600" />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember Password
            </label>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-700 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/Signup" className="text-blue-600 font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

