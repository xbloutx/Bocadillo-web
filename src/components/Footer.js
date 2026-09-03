import { FaWhatsapp, FaInstagram, FaGlobe, FaPhone } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
    return(
        <footer className="bg-[#47210D] text-bocadillo-antique px-6 pt-6 pb-8 border-t border-white/5 relative overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-bocadillo-hazelnut/20 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 relative z-10">
                
                <div className="font-serif flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm">
                    <a 
                        href="https://wa.me/51902733258" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 text-bocadillo-antique"
                    >    
                        <FaWhatsapp className="text-base" />
                        <span>902 733 258</span>
                    </a>
                    
                    <a 
                        href="https://instagram.com/bocadillope"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 text-bocadillo-antique"
                    >
                        <FaInstagram className="text-base" />
                        <span>bocadillope</span>
                    </a>
                    
                    <a 
                        href="https://bocadillo.pe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 text-bocadillo-antique"
                    >
                        <FaGlobe className="text-base" />
                        <span>bocadillo.pe</span>
                    </a>
                    
                    <a 
                        href="tel:+51987738624"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 text-bocadillo-antique"
                    >
                        <FaPhone className="text-base" />
                        <span>987 738 624</span>
                    </a>

                    <a 
                        href="/contacto" 
                        className="flex items-center px-5 py-2 rounded-full bg-bocadillo-hazelnut/30 hover:bg-bocadillo-hazelnut/50 border border-bocadillo-hazelnut/40 tracking-wider text-xs font-semibold active:scale-95 transition-all duration-200 text-bocadillo-antique"
                    >
                        CONTÁCTANOS
                    </a>
                </div>
                
                <div className="hover:scale-110 transition-transform duration-500 ease-out cursor-pointer mt-0">
                    <Image 
                        src="/images/footer-heart.png"
                        alt="Bocadillo Heart"
                        width={2172}
                        height={724}
                        style={{ width: "60px", height: "auto" }}
                        className="opacity-90 drop-shadow-md brightness-0 invert"
                    />
                </div>
                
            </div>
        </footer>
    );
}