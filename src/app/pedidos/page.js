import PageHeader from "@/components/PageHeader";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";

export const metadata = {
    title: "Pedidos",
    description: "Cómo pedir en Bocadillo: elige tu combo, escríbenos por WhatsApp o Instagram y coordina pago y entrega.",
};

const STEPS = [
    {
        title: "Elige tu combo",
        text: "Revisa el catálogo y elige el sandwich con el postre que más se te antoje.",
    },
    {
        title: "Escríbenos",
        text: "Cuéntanos por WhatsApp o Instagram qué quieres, cuántos combos y para cuándo.",
    },
    {
        title: "Confirma el pago",
        text: "Yape, Plin, transferencia o efectivo contra entrega, como te resulte más fácil.",
    },
    {
        title: "Recíbelo",
        text: "Coordinamos el delivery a tu dirección o un punto de recojo cercano contigo.",
    },
];

const PAYMENT_METHODS = ["Yape", "Plin", "Transferencia bancaria", "Efectivo contra entrega"];

export default function PedidosPage() {
    return (
        <main className="bg-background min-h-screen">
            <PageHeader title="PEDIDOS" subtitle="Así de fácil ♡" />

            <div className="max-w-4xl mx-auto px-6 sm:px-8 -mt-8 relative z-10 pb-16">
                <ol className="bg-paper rounded-3xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] divide-y divide-black/[0.04]">
                    {STEPS.map((step, index) => (
                        <li key={step.title} className="flex items-start gap-5 px-6 py-6 sm:px-10 sm:py-7">
                            <span className="shrink-0 w-9 h-9 rounded-full bg-bocadillo-antique text-bocadillo-walnut font-serif font-bold flex items-center justify-center text-sm">
                                {index + 1}
                            </span>
                            <div>
                                <h2 className="font-serif text-base sm:text-lg font-bold text-bocadillo-walnut">
                                    {step.title}
                                </h2>
                                <p className="font-serif text-sm sm:text-base text-bocadillo-hazelnut mt-1 leading-relaxed">
                                    {step.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-16 text-center">
                <h2 className="font-serif text-xl font-bold text-bocadillo-walnut mb-5">
                    Formas de pago
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {PAYMENT_METHODS.map((method) => (
                        <span
                            key={method}
                            className="font-serif text-sm text-bocadillo-walnut bg-bocadillo-antique/60 border border-black/[0.04] rounded-full px-5 py-2"
                        >
                            {method}
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-20">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="https://wa.me/51902733258?text=Hola!%20Quiero%20hacer%20un%20pedido"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif inline-flex items-center justify-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-medium text-base hover:bg-bocadillo-hazelnut active:scale-95 transition-all duration-300 shadow-xl shadow-bocadillo-walnut/20"
                    >
                        <FaWhatsapp className="text-lg" />
                        Pedir por WhatsApp
                    </a>
                    <a
                        href="https://instagram.com/bocadillope"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif inline-flex items-center justify-center gap-2 bg-bocadillo-antique text-bocadillo-walnut px-8 py-4 rounded-full font-medium text-base border border-black/[0.04] hover:bg-bocadillo-antique/60 active:scale-95 transition-all duration-300"
                    >
                        <FaInstagram className="text-lg" />
                        Escribir por Instagram
                    </a>
                </div>
            </div>
        </main>
    );
}
