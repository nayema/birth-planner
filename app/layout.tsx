import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Birth Planner - Your Birth Preferences Guide",
  description: "Create your personalized birth plan with our easy-to-use planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
