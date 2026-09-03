import { FaWhatsapp } from "react-icons/fa6";
import Link from 'next/link';

export default function Header() {
    return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 py-3">
        <div className="w-full max-w-6xl flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-xl border border-black/5 rounded-full shadow-sm">
            
            <Link href="/" className="font-serif text-xl font-bold tracking-tight text-bocadillo-walnut">
                BOCADILLO
            </Link>
            
            <nav className="hidden md:flex gap-8 font-serif text-[15px] font-semibold tracking-wide text-bocadillo-walnut">
                <Link href="/" className="hover:text-bocadillo-hazelnut active:scale-95 active:opacity-70 transition-all duration-200">INICIO</Link>
                <Link href="/catalogo" className="hover:text-bocadillo-hazelnut active:scale-95 active:opacity-70 transition-all duration-200">CATÁLOGO</Link>
                <Link href="/nosotros" className="hover:text-bocadillo-hazelnut active:scale-95 active:opacity-70 transition-all duration-200">NOSOTROS</Link>
                <Link href="/pedidos" className="hover:text-bocadillo-hazelnut active:scale-95 active:opacity-70 transition-all duration-200">PEDIDOS</Link>
                <Link href="/contacto" className="hover:text-bocadillo-hazelnut active:scale-95 active:opacity-70 transition-all duration-200">CONTACTO</Link>
            </nav>
            
            <div className="flex items-center gap-4">
                <a 
                    href="https://wa.me/51902733258" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Contactar por WhatsApp" 
                    className="text-bocadillo-walnut/80 hover:text-[#25D366] hover:scale-110 active:scale-95 transition-all duration-300"
                >
                    <FaWhatsapp className="text-[22px]" />
                </a>
            </div>
        </div>
    </header>
    );
}