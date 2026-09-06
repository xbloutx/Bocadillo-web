import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiFeather, FiSmile } from "react-icons/fi";

export const metadata = {
    title: "Nosotros",
    description: "Conoce la historia detrás de Bocadillo: sandwiches y postres hechos a mano, en casa.",
};

const VALUES = [
    {
        icon: FiHeart,
        title: "Hecho a mano",
        text: "Cada bolsa se arma una por una con dedicación y cariño.",
    },
    {
        icon: FiFeather,
        title: "Recetas propias",
        text: "Sabores clásicos con un toque casero auténtico.",
    },
    {
        icon: FiSmile,
        title: "Para compartir",
        text: "Ideal para una merienda o una celebración en familia.",
    },
];

export default function NosotrosPage() {
    return (
        <main className="bg-background flex-1">
            <PageHeader title="NOSOTROS" subtitle="Hecho en casa, con cariño ♡" />

            {/* Tarjeta de Historia / Manifiesto */}
            <div className="max-w-3xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-10">
                <div className="bg-paper rounded-2xl sm:rounded-3xl border border-black/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-12 text-center overflow-hidden">
                    
                    {/* Foto artesanal ilustrativa en móvil */}
                    <div className="relative w-full h-32 sm:hidden rounded-xl overflow-hidden mb-3.5 border border-black/5">
                        <Image
                            src="/images/fondo/pastel.webp"
                            alt="Preparación artesanal Bocadillo"
                            fill
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-serif font-bold text-white/90 tracking-wider uppercase">
                            Del horno a tu mesa
                        </span>
                    </div>

                    <p className="font-serif text-xs sm:text-xl leading-relaxed text-bocadillo-walnut font-medium">
                        Bocadillo nació de una idea simple: preparar en casa los sandwiches y postres
                        que nos gustaría recibir nosotros mismos. Cada pedido se arma a mano, con
                        ingredientes que elegimos con cuidado, para que abrir la bolsa se sienta como
                        un pequeño gesto de cariño.
                    </p>
                </div>
            </div>

            {/* Pilares Artesanales */}
            <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-4 sm:pt-16 pb-4 sm:pb-16">
                
                {/* Versión Móvil: Una sola tarjeta unificada y limpia con 3 filas */}
                <div className="flex sm:hidden flex-col bg-white/80 backdrop-blur-md rounded-2xl border border-black/[0.05] shadow-xs divide-y divide-black/[0.04] overflow-hidden">
                    {VALUES.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <div key={idx} className="flex items-center gap-3 p-3">
                                <div className="w-8 h-8 rounded-full bg-bocadillo-antique/80 text-bocadillo-copper flex items-center justify-center flex-shrink-0 shadow-xs">
                                    <Icon className="text-sm" />
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <h2 className="font-serif text-xs font-bold text-bocadillo-walnut leading-tight">
                                        {value.title}
                                    </h2>
                                    <p className="font-serif text-[11px] text-bocadillo-copper/90 leading-tight mt-0.5">
                                        {value.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Versión Desktop (>= sm): Grid tradicional de 3 columnas intacto */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-8 text-center">
                    {VALUES.map((value) => {
                        const Icon = value.icon;
                        return (
                            <div key={value.title} className="flex flex-col items-center px-2">
                                <div className="w-12 h-12 rounded-full bg-bocadillo-antique text-bocadillo-copper flex items-center justify-center mb-4 shadow-sm">
                                    <Icon className="text-xl" />
                                </div>
                                <h2 className="font-serif text-lg font-bold text-bocadillo-walnut">
                                    {value.title}
                                </h2>
                                <p className="font-serif text-sm text-bocadillo-copper mt-2 leading-relaxed max-w-[26ch] font-medium">
                                    {value.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Botón Ver Catálogo */}
            <div className="flex justify-center pb-6 sm:pb-20 px-4">
                <Link
                    href="/catalogo"
                    className="font-serif bg-bocadillo-walnut text-bocadillo-antique px-7 py-2.5 sm:px-10 sm:py-4 rounded-full font-bold text-xs sm:text-base tracking-wider hover:bg-bocadillo-bark active:scale-95 transition-all duration-75 shadow-md shadow-bocadillo-walnut/15"
                >
                    VER CATÁLOGO
                </Link>
            </div>
        </main>
    );
}
