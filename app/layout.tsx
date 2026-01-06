import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar/Topbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thai Train Jatri - Thailand Railway Schedule",
  description: "Find accurate Thailand Railway train schedules, live tracking, ticket information, and more. Plan your journey across Thailand with ease. Get real-time updates for all train routes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Topbar />

        <div
          className={`flex justify-between bg-[url('/snowflakes.png')] bg-center`}
        >
          <div className="hidden md:block w-1/6 pt-36 ">
          </div>
          <main className="flex-1">
            <p className="whitespace-nowrap text-end py-4 text-xs italic mr-4">Last Updated: 6th January, 2026</p>
            {/* <div
              className="overflow-hidden w-full min-h-[430px] max-h-[430px] flex items-center justify-center"
            >
            </div> */}
            {children}
          </main>
          <div className="hidden md:block w-1/6 pt-36 pl-8">
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
