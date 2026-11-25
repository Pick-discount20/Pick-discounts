import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pick Discount — Local Business Discovery & Verification Marketplace",
  description: "Find trusted local businesses, explore verified reviews, and connect with reputable service providers around you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F8F7F3] text-[#14213D] antialiased">
        {children}
      </body>
    </html>
  );
}
