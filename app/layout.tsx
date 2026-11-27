import type { Metadata } from "next";
import "./globals.css";
import "./excipio.css";

export const metadata: Metadata = {
  title: "OpenFish — Autonomous Cyber Recon & Honeypot AI",
  description: "AI agents that bait online scammers in isolated browsers and auto-generate cybercrime evidence dossiers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-mod-js w-mod-ix">
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;600;700;800&family=Inconsolata:wght@400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body min-h-screen overflow-x-hidden w-full max-w-full">{children}</body>
    </html>
  );
}
