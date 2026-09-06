import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";

export const metadata = {
    title: "Pedidos",
    description: "Cómo pedir en Bocadillo: elige tu combo, escríbenos por WhatsApp o Instagram y coordina pago y entrega.",
};

const STEPS = [
    {
        title: "Elige tu combo",
        text: "Revisa el catálogo y elige el sandwich con el postre y refresco que más se te antoje.",
    },
    {
        title: "Escríbenos",
        text: "Cuéntanos por WhatsApp o Instagram qué combo deseas, cantidad y para qué fecha.",
    },
    {
        title: "Confirma el pago",
        text: "Aceptamos Yape, Plin, transferencia bancaria o efectivo contra entrega.",
    },
    {
        title: "Recíbelo con cariño",
        text: "Coordinamos el delivery a tu dirección o un punto de recojo acordado contigo.",
    },
];

const PAYMENT_METHODS = [
    { 
        name: "Yape", 
        image: "/images/yape.webp",
        alt: "Logo Yape"
    },
    { 
        name: "Plin", 
        image: "/images/plin.webp",
        alt: "Logo Plin"
    },
    { 
        name: "Transferencia", 
        icon: FiCreditCard, 
    },
    { 
        name: "Contra entrega", 
        icon: FiDollarSign, 
    },
];

export default function PedidosPage() {
    return (
        <main className="bg-background flex-1">
            <PageHeader title="PEDIDOS" subtitle="Así de fácil ♡" />

            {/* ========================================================
                1. TIMELINE DE PASOS
            ======================================================== */}
            <div className="max-w-3xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-10 pb-5 sm:pb-12">
                <ol className="bg-paper rounded-2xl sm:rounded-3xl border border-black/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.04)] divide-y divide-black/[0.04] overflow-hidden">
                    {STEPS.map((step, index) => (
                        <li key={step.title} className="flex items-start gap-3 sm:gap-5 px-4 py-3.5 sm:px-10 sm:py-7">
                            <span className="shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-bocadillo-antique text-bocadillo-walnut font-serif font-black flex items-center justify-center text-xs sm:text-sm border border-bocadillo-copper/20 shadow-xs">
                                {index + 1}
                            </span>
                            <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                                <h2 className="font-serif text-xs sm:text-lg font-bold text-bocadillo-walnut leading-snug">
                                    {step.title}
                                </h2>
                                <p className="font-serif text-[11px] sm:text-base text-bocadillo-copper mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed font-medium">
                                    {step.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            {/* ========================================================
                2. FORMAS DE PAGO ACEPTADAS (Apple Inset Card en móvil)
            ======================================================== */}
            <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-5 sm:pb-12">
                <div className="bg-white/75 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-black/[0.04] shadow-xs text-center">
                    <h2 className="font-serif text-xs sm:text-xl font-bold text-bocadillo-walnut mb-3 sm:mb-5">
                        Formas de pago aceptadas
                    </h2>
                    
                    {/* Grid 2x2 en móvil / Chips continuos en desktop */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
                        {PAYMENT_METHODS.map((method) => {
                            const IconComponent = method.icon;
                            return (
                                <div
                                    key={method.name}
                                    className="flex items-center justify-center gap-2 font-serif text-[11px] sm:text-sm font-semibold text-bocadillo-walnut bg-bocadillo-antique/50 border border-black/[0.04] rounded-xl sm:rounded-full px-3 py-2 sm:px-5 sm:py-2.5 shadow-2xs"
                                >
                                    {method.image ? (
                                        <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden flex-shrink-0 shadow-2xs">
                                            <Image 
                                                src={method.image} 
                                                alt={method.alt} 
                                                fill 
                                                sizes="20px"
                                                className="object-cover" 
                                            />
                                        </div>
                                    ) : (
                                        <IconComponent className="text-sm sm:text-base text-bocadillo-copper" />
                                    )}
                                    <span>{method.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ========================================================
                3. BOTONES DE ACCIÓN (WhatsApp prioritario + Instagram)
            ======================================================== */}
            <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-8 sm:pb-20">
                <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-4">
                    <a
                        href="https://wa.me/51902733258?text=¡Hola%20Bocadillo!%20Quiero%20hacer%20un%20pedido"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#FAF7F4] text-bocadillo-walnut px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold text-xs sm:text-base tracking-wide border border-[#25D366]/35 active:scale-95 transition-all duration-75 shadow-xs sm:shadow-md"
                    >
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                            <FaWhatsapp className="text-sm sm:text-base" />
                        </span>
                        <span>Pedir por WhatsApp</span>
                    </a>
                    
                    <a
                        href="https://instagram.com/bocadillope"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#FAF7F4] text-bocadillo-walnut px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold text-xs sm:text-base tracking-wide border border-[#E1306C]/30 active:scale-95 transition-all duration-75 shadow-xs sm:shadow-md"
                    >
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] shrink-0">
                            <FaInstagram className="text-sm sm:text-base" />
                        </span>
                        <span>Escribir por Instagram</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
