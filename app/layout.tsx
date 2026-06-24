import React from "react";
import "./globals.css";

export const metadata = {
  title: "Social Network",
  description: "Responsive slicing test (Next.js + dummyjson)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
