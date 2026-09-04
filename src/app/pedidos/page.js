import PageHeader from "@/components/PageHeader";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";

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

const PAYMENT_METHODS = ["Yape", "Plin", "Transferencia bancaria", "Efectivo contra entrega"];

export default function PedidosPage() {
    return (
        <main className="bg-background min-h-screen">
            <PageHeader title="PEDIDOS" subtitle="Así de fácil ♡" />

            <div className="max-w-4xl mx-auto px-6 sm:px-8 -mt-8 relative z-10 pb-16">
                <ol className="bg-paper rounded-3xl border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] divide-y divide-black/[0.04] overflow-hidden">
                    {STEPS.map((step, index) => (
                        <li key={step.title} className="flex items-start gap-5 px-6 py-6 sm:px-10 sm:py-7">
                            <span className="shrink-0 w-10 h-10 rounded-full bg-bocadillo-antique text-bocadillo-walnut font-serif font-black flex items-center justify-center text-sm border border-bocadillo-copper/20 shadow-sm">
                                {index + 1}
                            </span>
                            <div>
                                <h2 className="font-serif text-base sm:text-lg font-bold text-bocadillo-walnut">
                                    {step.title}
                                </h2>
                                <p className="font-serif text-sm sm:text-base text-bocadillo-copper mt-1 leading-relaxed font-medium">
                                    {step.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-16 text-center">
                <h2 className="font-serif text-xl font-bold text-bocadillo-walnut mb-5">
                    Formas de pago aceptadas
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {PAYMENT_METHODS.map((method) => (
                        <span
                            key={method}
                            className="font-serif text-sm font-semibold text-bocadillo-walnut bg-bocadillo-antique/60 border border-black/[0.04] rounded-full px-5 py-2.5 shadow-sm"
                        >
                            {method}
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-20">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="https://wa.me/51902733258?text=¡Hola%20Bocadillo!%20Quiero%20hacer%20un%20pedido"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif inline-flex items-center justify-center gap-2.5 bg-bocadillo-walnut hover:bg-bocadillo-bark text-bocadillo-antique px-8 py-4 rounded-full font-bold text-base tracking-wider active:scale-[0.97] transition-all duration-75 shadow-xl shadow-bocadillo-walnut/20"
                    >
                        <FaWhatsapp className="text-xl text-[#25D366]" />
                        <span>Pedir por WhatsApp</span>
                    </a>
                    <a
                        href="https://instagram.com/bocadillope"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif inline-flex items-center justify-center gap-2.5 bg-bocadillo-antique text-bocadillo-walnut hover:bg-bocadillo-antique/80 px-8 py-4 rounded-full font-bold text-base tracking-wider border border-black/[0.05] active:scale-[0.97] transition-all duration-75 shadow-sm"
                    >
                        <FaInstagram className="text-xl" />
                        <span>Escribir por Instagram</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
