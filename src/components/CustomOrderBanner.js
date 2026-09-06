import Image from "next/image";
import { FiGift } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_NUMBER = "51902733258";

export default function CustomOrderBanner() {
    const customMessage = encodeURIComponent(
        "¡Hola Bocadillo! ♡ Me gustaría cotizar un pedido personalizado para un detalle/evento especial."
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${customMessage}`;

    return (
        <>
            {/* ========================================================
                VERSIÓN MÓVIL (< md): Tira horizontal compacta y moderna
            ======================================================== */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex md:hidden items-center gap-3 bg-white/80 active:bg-white backdrop-blur-md rounded-2xl p-2.5 border border-black/[0.06] shadow-xs active:scale-[0.98] transition-all group"
            >
                {/* Miniatura cuadrada con bordes redondeados */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF7F4] flex-shrink-0 border border-black/5">
                    <Image
                        src="/images/producto-3.webp"
                        alt="Combo personalizado"
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Textos directos y limpios */}
                <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-bocadillo-copper font-serif">
                            Personalizado
                        </span>
                        <span className="text-[10px]">✨</span>
                    </div>
                    <h3 className="font-serif font-black text-sm text-bocadillo-walnut leading-tight truncate">
                        ¿Un detalle a tu medida?
                    </h3>
                    <p className="font-serif text-[11px] text-bocadillo-walnut/70 truncate mt-0.5">
                        Cotiza por WhatsApp en minutos
                    </p>
                </div>

                {/* Botón táctil circular / píldora con WhatsApp */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-bocadillo-walnut text-[#25D366] shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FaWhatsapp className="text-base" />
                </div>
            </a>

            {/* ========================================================
                VERSIÓN ESCRITORIO (>= md): Banner amplio original intacto
            ======================================================== */}
            <section className="hidden md:block mt-12 bg-bocadillo-antique/40 backdrop-blur-sm rounded-3xl border border-black/5 p-8 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex items-start gap-5 text-left">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-bocadillo-walnut shadow-sm border border-black/5 flex-shrink-0">
                            <FiGift className="text-3xl text-bocadillo-copper" />
                        </div>

                        <div>
                            <h3 className="font-serif font-black text-3xl text-bocadillo-walnut tracking-tight">
                                ¿Prefieres algo personalizado?
                            </h3>
                            <p className="font-serif text-base text-bocadillo-copper mt-1.5 font-medium">
                                Armamos el detalle perfecto para ti y tus celebraciones.
                            </p>

                            <div className="mt-5">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 bg-bocadillo-walnut hover:bg-bocadillo-bark text-bocadillo-antique px-8 py-3.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-75 shadow-md shadow-bocadillo-walnut/15"
                                >
                                    <FaWhatsapp className="text-base text-[#25D366]" />
                                    <span>HAZ TU PEDIDO</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full max-w-[280px] h-44 rounded-2xl overflow-hidden shadow-md border border-black/5 flex-shrink-0">
                        <Image
                            src="/images/producto-3.webp"
                            alt="Combo personalizado Bocadillo"
                            fill
                            sizes="280px"
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
