import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa6";
import { FiChevronRight, FiTruck, FiClock } from "react-icons/fi";

export const metadata = {
    title: "Contacto",
    description: "Escríbenos a Bocadillo por WhatsApp, Instagram o llamada. Coordinamos delivery o recojo según tu zona.",
};

const CONTACTS = [
    {
        icon: FaWhatsapp,
        label: "WhatsApp / Pedidos",
        value: "902 733 258",
        href: "https://wa.me/51902733258",
        highlight: true,
    },
    {
        icon: FaWhatsapp,
        label: "Llamadas",
        value: "987 738 624",
        href: "https://wa.me/51987738624",
        highlight: true,
    },
    {
        icon: FaInstagram,
        label: "Instagram",
        value: "@bocadillope",
        href: "https://instagram.com/bocadillope",
    },
    {
        icon: FaTiktok,
        label: "TikTok Oficial",
        value: "@bocadillo.pe",
        href: "https://www.tiktok.com/@bocadillo.pe",
    },
];

export default function ContactoPage() {
    return (
        <main className="bg-background">
            <PageHeader title="CONTACTO" subtitle="Estamos a un mensaje ♡" />

            {/* ========================================================
                CANALES DE CONTACTO
            ======================================================== */}
            <div className="max-w-3xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-10 pb-3 sm:pb-8">
                
                {/* Versión Móvil: Apple Inset Grouped List unificada */}
                <div className="flex sm:hidden flex-col bg-paper/80 rounded-2xl border border-black/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.03)] divide-y divide-black/[0.04] overflow-hidden">
                    {CONTACTS.map((contact) => {
                        const Icon = contact.icon;
                        return (
                            <a
                                key={contact.label}
                                href={contact.href}
                                target={contact.href.startsWith("http") ? "_blank" : undefined}
                                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-3 px-4 py-3.5 active:bg-black/[0.03] transition-colors"
                            >
                                <span className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center shadow-xs ${
                                    contact.highlight 
                                        ? "bg-[#25D366]/15 text-[#25D366]" 
                                        : "bg-bocadillo-antique/70 text-bocadillo-walnut"
                                }`}>
                                    <Icon className="text-base" />
                                </span>
                                <span className="flex-1 min-w-0 text-left">
                                    <span className="block font-serif text-[10px] uppercase tracking-wider text-bocadillo-copper font-bold leading-tight">
                                        {contact.label}
                                    </span>
                                    <span className="block font-serif text-sm font-bold text-bocadillo-walnut leading-tight mt-0.5">
                                        {contact.value}
                                    </span>
                                </span>
                                <FiChevronRight className="text-bocadillo-copper/40 text-base" />
                            </a>
                        );
                    })}
                </div>

                {/* Versión Desktop (>= sm): Grid de 2 columnas original intacto */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                    {CONTACTS.map((contact) => {
                        const Icon = contact.icon;
                        return (
                            <a
                                key={contact.label}
                                href={contact.href}
                                target={contact.href.startsWith("http") ? "_blank" : undefined}
                                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group flex items-center gap-4 bg-paper rounded-2xl border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(71,33,13,0.08)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-75 px-6 py-5 cursor-pointer"
                            >
                                <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                    contact.highlight 
                                        ? "bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white" 
                                        : "bg-bocadillo-antique/60 text-bocadillo-walnut group-hover:bg-bocadillo-copper group-hover:text-white"
                                }`}>
                                    <Icon className="text-xl" />
                                </span>
                                <span className="text-left">
                                    <span className="block font-serif text-xs uppercase tracking-wider text-bocadillo-copper font-bold">
                                        {contact.label}
                                    </span>
                                    <span className="block font-serif text-base font-bold text-bocadillo-walnut">
                                        {contact.value}
                                    </span>
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* ========================================================
                TARJETA VISUAL ARTESANAL (Llena el espacio con calidez en móvil)
            ======================================================== */}
            <div className="block sm:hidden max-w-3xl mx-auto px-4 pb-3">
                <div className="relative rounded-2xl overflow-hidden border border-black/5 shadow-xs bg-[#FAF7F4]">
                    <div className="relative w-full h-32">
                        <Image
                            src="/images/box/box-arriba.webp"
                            alt="Caja artesanal Bocadillo"
                            fill
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                        
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                            <div>
                                <span className="inline-block px-2 py-0.5 rounded-full bg-bocadillo-copper text-[#FAF7F4] text-[9px] uppercase font-serif font-bold tracking-widest mb-1 shadow-xs">
                                    Taller artesanal
                                </span>
                                <p className="font-serif text-xs font-bold text-white leading-tight drop-shadow-sm">
                                    Hecho a mano el mismo día
                                </p>
                            </div>
                            
                            {/* Badge con fondo sólido nogal oscuro visible al 100% */}
                            <div className="flex items-center gap-1.5 bg-bocadillo-walnut text-[#F6E9D9] px-2.5 py-1 rounded-full text-[10px] font-serif font-bold border border-white/15 shadow-md shrink-0">
                                <FiClock className="text-xs text-bocadillo-copper" />
                                <span>24h anticipación</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================
                NOTA DELIVERY / RECOJO (Cierre armónico)
            ======================================================== */}
            <div className="max-w-3xl w-full mx-auto px-4 sm:px-8 pb-6 sm:pb-20 text-center">
                <div className="bg-bocadillo-antique/30 rounded-2xl p-4 sm:p-6 border border-black/5 max-w-xl mx-auto flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-bocadillo-copper shrink-0 shadow-2xs">
                        <FiTruck className="text-base" />
                    </div>
                    <p className="font-serif text-xs sm:text-base text-bocadillo-walnut font-medium leading-relaxed">
                        ¿Delivery o recojo? Coordinamos el punto o la zona de entrega directo por WhatsApp según tu comodidad.
                    </p>
                </div>
            </div>
        </main>
    );
}
