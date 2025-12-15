import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notix | Notes App",
  description: "Notix is a Note-taking app that boost efficency and recall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#181825]">
        {children}
      </body>
    </html>
  );
}
