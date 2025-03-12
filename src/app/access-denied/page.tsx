"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AccessDenied = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-4 text-lg text-gray-700">
          You do not have permission to view this page.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
