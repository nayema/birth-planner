"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h1>
      <p className="text-slate-600 mb-6 text-center max-w-md">
        We encountered an unexpected error. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 font-medium hover:bg-slate-300"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
