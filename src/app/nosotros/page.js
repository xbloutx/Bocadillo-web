import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata = {
    title: "Nosotros",
    description: "Conoce la historia detrás de Bocadillo: sandwiches y postres hechos a mano, en casa.",
};

const VALUES = [
    {
        title: "Hecho a mano",
        text: "Cada bolsa se arma una por una, no en una línea de producción. Lo notas en el detalle.",
    },
    {
        title: "Recetas propias",
        text: "Mezclamos sabores clásicos peruanos con un toque casero que no encuentras en cualquier lado.",
    },
    {
        title: "Pensado para compartir",
        text: "Ideal para un antojo, un detalle inesperado o una pequeña celebración en casa.",
    },
];

export default function NosotrosPage() {
    return (
        <main className="bg-background min-h-screen">
            <PageHeader title="NOSOTROS" subtitle="Hecho en casa, con cariño ♡" />

            <div className="max-w-3xl mx-auto px-6 sm:px-8 -mt-8 relative z-10">
                <div className="bg-paper rounded-3xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-10 sm:px-12 sm:py-12 text-center">
                    <p className="font-serif text-lg sm:text-xl leading-relaxed text-foreground">
                        Bocadillo nació de una idea simple: preparar en casa los sandwiches y postres
                        que nos gustaría recibir nosotros mismos. Cada pedido se arma a mano, con
                        ingredientes que elegimos con cuidado, para que abrir la bolsa se sienta como
                        un pequeño gesto de cariño.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-16">
                <div className="grid sm:grid-cols-3 gap-8 text-center">
                    {VALUES.map((value) => (
                        <div key={value.title} className="flex flex-col items-center px-2">
                            <span className="w-10 h-[3px] rounded-full bg-bocadillo-hazelnut mb-5" />
                            <h2 className="font-serif text-lg font-bold text-bocadillo-walnut">
                                {value.title}
                            </h2>
                            <p className="font-serif text-sm text-bocadillo-hazelnut mt-2 leading-relaxed max-w-[26ch]">
                                {value.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pb-20">
                <Link
                    href="/catalogo"
                    className="font-serif bg-foreground text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-bocadillo-hazelnut active:scale-95 active:opacity-90 transition-all duration-300 shadow-xl shadow-bocadillo-walnut/20"
                >
                    VER CATÁLOGO
                </Link>
            </div>
        </main>
    );
}
