import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "@/lib/store";
import { PrivacyNotice } from "@/components/PrivacyNotice";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Critical fallback – ensures base styles load even if Tailwind bundle delays */}
        <style dangerouslySetInnerHTML={{ __html: `
          html,body{background:#F3F0FF!important;font-family:Inter,sans-serif!important;color:#1e293b!important;margin:0;padding:0;-webkit-font-smoothing:antialiased}
          a{color:inherit!important;text-decoration:none!important}
        `}} />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <PreferencesProvider>
          <main className="flex-1">{children}</main>
          <PrivacyNotice />
        </PreferencesProvider>
      </body>
    </html>
  );
}
