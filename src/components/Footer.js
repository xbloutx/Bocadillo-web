import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
    return(
        <footer className="bg-bocadillo-walnut text-bocadillo-antique px-6 pt-8 pb-10 border-t border-white/5 relative overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-bocadillo-copper/15 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 relative z-10">
                
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