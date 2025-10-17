import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DecorativeImage from './components/DecorativeImage';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'KazeAnime',
  description: 'Anime Explorer App',
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
        <DecorativeImage />
        <Navbar />
        <div className="empty h-[150px] sm:h-0"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
