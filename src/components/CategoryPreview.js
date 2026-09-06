import Image from "next/image";
import Link from "next/link";

// CAPA 1: Modelo de datos (Equivalente a un List[Dict] en Python)
const CATEGORIES = [
    {
        id: "dulces",
        title: "Dulces",
        image: "/images/fondo/tartaletas.webp",
        href: "/catalogo?cat=dulces",
    },
    {
        id: "salados",
        title: "Salados",
        image: "/images/fondo/pastel.webp",
        href: "/catalogo?cat=salados",
    },
    {
        id: "boxes",
        title: "Boxes Escolares",
        image: "/images/box.webp",
        href: "/catalogo?cat=boxes-escolares",
    },
];

export default function CategoryPreview() {
    return (
        // CAPA 2 & 3: Esqueleto semántico y Layout con Tailwind
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Título de la sección con adornos de trigo */}
            <div className="flex items-center justify-center gap-1.5 mb-3.5 sm:mb-6 text-center">
                <div className="hover:scale-110 active:scale-95 transition-transform duration-300 ease-out cursor-pointer">
                    <Image 
                        src="/images/iz-trigo.webp"
                        alt="Bocadillo Trigo Izquierdo"
                        width={2172}
                        height={724}
                        style={{ width: "36px", height: "auto" }}
                        className="-mt-1.5 sm:-mt-3 drop-shadow-xs"
                    />
                </div>
                
                <h2 className="font-serif font-black text-lg sm:text-2xl lg:text-3xl text-bocadillo-walnut tracking-[-0.02em]">
                    NUESTROS PRODUCTOS
                </h2>
                <div className="hover:scale-110 active:scale-95 transition-transform duration-300 ease-out cursor-pointer">
                    <Image 
                        src="/images/de-trigo.webp"
                        alt="Bocadillo Trigo Derecho"
                        width={2172}
                        height={724}
                        style={{ width: "36px", height: "auto" }}
                        className="-mt-1.5 sm:-mt-3 drop-shadow-xs"
                    />
                </div>
            </div>

            {/* Carrusel táctil en móvil (flex snap con peek óptimo) / Cuadrícula de 3 columnas en desktop */}
            <div className="flex sm:grid sm:grid-cols-3 gap-3.5 sm:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category.id}
                        href={category.href}
                        // CAPA 4: Físicas y microinteracciones de Apple Design
                        className="group shrink-0 w-[60vw] max-w-[230px] sm:w-full sm:max-w-none snap-center bg-paper rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.05] shadow-[0_6px_20px_rgba(71,33,13,0.05)] hover:shadow-[0_20px_40px_rgba(71,33,13,0.09)] hover:-translate-y-1.5 active:scale-[0.97] transition-all duration-100 ease-out flex flex-col cursor-pointer"
                    >
                        {/* Contenedor de la foto con aspect ratio estilizado */}
                        <div className="relative w-full h-36 sm:h-60 bg-[#f5f5f7] overflow-hidden border-b border-black/[0.03]">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                sizes="(max-width: 640px) 60vw, 350px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                priority
                                loading="eager"
                            />
                            {/* Anillo de enmarcado fotográfico estilo Apple */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                        </div>

                        {/* Etiqueta inferior de la categoría */}
                        <div className="py-2.5 px-3 text-center bg-paper flex flex-col justify-center flex-1">
                            <h3 className="font-serif font-black text-sm sm:text-lg text-bocadillo-walnut tracking-tight group-hover:text-bocadillo-copper transition-colors duration-200">
                                {category.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

