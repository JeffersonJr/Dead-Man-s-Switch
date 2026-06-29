import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import packageInfo from "../../package.json";


export const metadata: Metadata = {
  title: "Dharma Station Swan",
  description: "Dead Man's Switch Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased crt`}
      >
        <div className="vignette"></div>
        <div className="crt-retrace"></div>
        {children}
        <Analytics />
        <div className="fixed bottom-4 right-4 text-2xl text-[#00ff41] glow-text font-mono z-50">
          V.{packageInfo.version}
        </div>
      </body>
    </html>
  );
}
