import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bitter, Dancing_Script } from "next/font/google";

const bitter = Bitter({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-bitter",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dancing",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${bitter.variable} ${dancing.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}