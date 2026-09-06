import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-bocadillo-walnut text-bocadillo-antique border-t border-white/5 relative overflow-hidden">
            
            {/* Resplandor cálido de fondo estilo Apple */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-16 sm:h-24 bg-bocadillo-copper/15 blur-[50px] sm:blur-[60px] rounded-full pointer-events-none" />

            {/* ========================================================
                VERSIÓN MÓVIL (< md) - Compacta y minimalista
            ======================================================== */}
            <div className="flex md:hidden max-w-xl mx-auto flex-col items-center gap-3 text-center py-6 px-4 relative z-10">
                
                {/* Detalle Artesanal del Corazón Bocadillo */}
                <div className="hover:scale-110 active:scale-95 transition-transform duration-300 ease-out cursor-pointer -mb-0.5">
                    <Image 
                        src="/images/footer-heart.png"
                        alt="Bocadillo Heart"
                        width={2172}
                        height={724}
                        style={{ width: "38px", height: "auto" }}
                        className="opacity-80 brightness-0 invert drop-shadow-sm"
                    />
                </div>

                {/* 1. Redes Sociales & WhatsApp (Iconos Circulares Delicados) */}
                <div className="flex items-center justify-center gap-3">
                    <a
                        href="https://wa.me/51902733258"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp Bocadillo"
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 text-bocadillo-antique hover:text-white active:scale-90 transition-all flex items-center justify-center shadow-xs"
                    >
                        <FaWhatsapp className="text-base" />
                    </a>

                    <a
                        href="https://instagram.com/bocadillope"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram @bocadillope"
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 text-bocadillo-antique hover:text-white active:scale-90 transition-all flex items-center justify-center shadow-xs"
                    >
                        <FaInstagram className="text-sm" />
                    </a>

                    <a
                        href="https://www.tiktok.com/@bocadillo.pe"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok @bocadillo.pe"
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 text-bocadillo-antique hover:text-white active:scale-90 transition-all flex items-center justify-center shadow-xs"
                    >
                        <FaTiktok className="text-xs" />
                    </a>
                </div>

                {/* 2. Canales de Atención en texto sutil */}
                <p className="font-serif text-[11px] text-bocadillo-antique/70">
                    Pedidos y consultas:{" "}
                    <a 
                        href="https://wa.me/51902733258" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-bocadillo-antique hover:text-white transition-colors"
                    >
                        902 733 258
                    </a>
                    {" · "}
                    <a 
                        href="https://wa.me/51987738624" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-bocadillo-antique hover:text-white transition-colors"
                    >
                        987 738 624
                    </a>
                </p>

                {/* 3. Cierre y Copyright */}
                <p className="text-[10px] text-bocadillo-antique/40 tracking-wider">
                    © {new Date().getFullYear()} Bocadillo · Hecho a mano y con cariño
                </p>
            </div>

            {/* ========================================================
                VERSIÓN ESCRITORIO (>= md) - Exactamente la original intacta
            ======================================================== */}
            <div className="hidden md:flex max-w-5xl mx-auto flex-col items-center gap-6 px-6 pt-8 pb-10 relative z-10">
                <div className="font-serif flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                    <a 
                        href="/contacto" 
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-75 text-bocadillo-antique font-semibold tracking-wider text-xs"
                    >
                        CONTÁCTANOS
                    </a>
                   
                    <a 
                        href="https://wa.me/51902733258" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-75 text-bocadillo-antique"
                    >    
                        <FaWhatsapp className="text-base" />
                        <span>902 733 258</span>
                    </a>

                    <a 
                        href="https://wa.me/51987738624"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-75 text-bocadillo-antique"
                    >
                        <FaWhatsapp className="text-base" />
                        <span>987 738 624</span>
                    </a>
                    
                    <a 
                        href="https://instagram.com/bocadillope"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-75 text-bocadillo-antique"
                    >
                        <FaInstagram className="text-base" />
                        <span>bocadillope</span>
                    </a>
                    
                    <a 
                        href="https://www.tiktok.com/@bocadillo.pe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-75 text-bocadillo-antique"
                    >
                        <FaTiktok className="text-base" />
                        <span>bocadillo.pe</span>
                    </a>
                </div>
                
                <div className="hover:scale-110 active:scale-95 transition-transform duration-300 ease-out cursor-pointer">
                    <Image 
                        src="/images/footer-heart.png"
                        alt="Bocadillo Heart"
                        width={2172}
                        height={724}
                        style={{ width: "50px", height: "auto" }}
                        className="opacity-90 drop-shadow-md brightness-0 invert"
                    />
                </div>

                <p className="text-[11px] text-bocadillo-antique/50 tracking-wider text-center">
                    © {new Date().getFullYear()} Bocadillo · Hecho a mano y con cariño
                </p>
            </div>

        </footer>
    );
}