import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bitter, Dancing_Script } from "next/font/google";

const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-bitter",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dancing",
});

export const viewport = {
  themeColor: "#FBFBFD",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: {
    default: "Bocadillo — 100% casero",
    template: "%s · Bocadillo",
  },
  description:
    "Sandwiches y postres 100% caseros en Perú. Combos hechos a mano y entregados con cariño. Pide por WhatsApp o Instagram.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${bitter.variable} ${dancing.variable} flex flex-col min-h-screen selection:bg-bocadillo-copper/20 selection:text-bocadillo-walnut`}>
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}