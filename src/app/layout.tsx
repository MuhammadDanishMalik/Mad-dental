import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
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
      <body>
        <AnnouncementBar />
        {children}
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
