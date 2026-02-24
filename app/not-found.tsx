import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold text-slate-800 mb-2">Page not found</h1>
      <p className="text-slate-600 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90"
      >
        Back to Birth Planner
      </Link>
    </div>
  );
}
