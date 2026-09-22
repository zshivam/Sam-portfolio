import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sam-portfolio | Shivam Sahani",
  description:
    "Building dynamic full-stack web experiences while leveraging strong algorithmic foundations and data-driven analytical skills.",
  keywords: ["sam-portfolio", "Shivam Sahani", "Software Developer", "Full Stack", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Shivam Sahani" }],
  openGraph: {
    title: "sam-portfolio | Shivam Sahani",
    description: "Full-stack software developer & multi-disciplinary builder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
