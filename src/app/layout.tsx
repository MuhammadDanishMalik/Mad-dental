import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mad Dental Care – Pakistan's No 1 Teeth Whitening",
  description:
    "Shop Mad Dental Care's professional teeth whitening products including whitening foam, powder, strips and exclusive bundle deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
