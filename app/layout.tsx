import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500",'600', "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500",'600', "700", "800"],
});

export const metadata: Metadata = {
  title: "KazeAnime",
  description: "Anime Explorer App",
};
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="relative overflow-x-hidden">
        {/* decorative image is absolutely positioned relative to body so it can sit in the top-right and still scroll with the page */}
        <div className="absolute -top-[3%] sm:-top-[6.5%] md:-top-[12%] -right-[17%] md:-right-[10%] pointer-events-none z-0 w-72 sm:w-96 lg:w-[540px]">
          <img
            src="https://framerusercontent.com/images/dwxExDkm76wbBZfsBvtV3qnpVs.png?scale-down-to=1024"
            alt="decorative"
            className="w-full h-auto floating-vertical"
          />
        </div>
        <Navbar />
        <div className="empty h-[150px] sm:h-0"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
