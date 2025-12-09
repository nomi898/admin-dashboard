"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Logged Out</h1>
        <p className="text-gray-600 mb-6">
          You have been logged out. Sign in again to continue.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.push("/Login")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

