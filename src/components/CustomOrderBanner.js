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
        <section className="mt-12 bg-bocadillo-antique/40 backdrop-blur-sm rounded-3xl border border-black/5 p-6 sm:p-8 overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-bocadillo-walnut shadow-sm border border-black/5 flex-shrink-0">
                        <FiGift className="text-3xl text-bocadillo-copper" />
                    </div>

                    <div>
                        <h3 className="font-serif font-black text-2xl sm:text-3xl text-bocadillo-walnut tracking-tight">
                            ¿Prefieres algo personalizado?
                        </h3>
                        <p className="font-serif text-sm sm:text-base text-bocadillo-copper mt-1.5 font-medium">
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
                        src="/images/producto-3.png"
                        alt="Combo personalizado Bocadillo"
                        fill
                        sizes="280px"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>
        </section>
    );
}
