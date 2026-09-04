import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata = {
    title: "Nosotros",
    description: "Conoce la historia detrás de Bocadillo: sandwiches y postres hechos a mano, en casa.",
};

const VALUES = [
    {
        title: "Hecho a mano",
        text: "Cada bolsa se arma una por una con dedicación. Lo notas en cada detalle.",
    },
    {
        title: "Recetas propias",
        text: "Mezclamos sabores clásicos con un toque casero auténtico que endulza tus momentos.",
    },
    {
        title: "Pensado para compartir",
        text: "Ideal para una merienda, un detalle especial o una celebración en familia.",
    },
];

export default function NosotrosPage() {
    return (
        <main className="bg-background min-h-screen">
            <PageHeader title="NOSOTROS" subtitle="Hecho en casa, con cariño ♡" />

            <div className="max-w-3xl mx-auto px-6 sm:px-8 -mt-8 relative z-10">
                <div className="bg-paper rounded-3xl border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-10 sm:px-12 sm:py-12 text-center">
                    <p className="font-serif text-lg sm:text-xl leading-relaxed text-bocadillo-walnut">
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
                            <span className="w-10 h-[3px] rounded-full bg-bocadillo-copper mb-5" />
                            <h2 className="font-serif text-lg font-bold text-bocadillo-walnut">
                                {value.title}
                            </h2>
                            <p className="font-serif text-sm text-bocadillo-copper mt-2 leading-relaxed max-w-[26ch] font-medium">
                                {value.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pb-20">
                <Link
                    href="/catalogo"
                    className="font-serif bg-bocadillo-walnut text-bocadillo-antique px-10 py-4 rounded-full font-bold text-base tracking-wider hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-75 shadow-xl shadow-bocadillo-walnut/20"
                >
                    VER CATÁLOGO
                </Link>
            </div>
        </main>
    );
}
