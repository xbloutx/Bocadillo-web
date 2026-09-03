import Image from "next/image";

export default function ProductCard({ product, priority = false }) {
    return (
        <div className="group bg-paper rounded-3xl overflow-hidden border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col h-full">
            
            {/* Contenedor de la imagen: Edge-to-edge (sin padding) y mayor altura */}
            <div className="relative w-full h-60 bg-[#f5f5f7] overflow-hidden border-b border-black/[0.03]">
                <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    /* Cambiamos object-contain por object-cover y quitamos el padding */
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={priority}
                />
                {/* Sutil sombra interior (ring) para enmarcar la imagen como lo hace Apple con las fotos */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <p className="font-serif text-sm text-foreground font-medium leading-snug">
                        {product.name}
                    </p>

                    <p className="font-serif text-xs text-bocadillo-hazelnut mt-2 font-normal">
                        Presentación: {product.presentation}
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.04]">
                    <div className="flex items-baseline justify-between mb-4">
                        <span className="text-xs uppercase tracking-wider text-bocadillo-hazelnut font-semibold">
                            Precio
                        </span>
                        <span className="font-serif text-2xl font-black text-foreground tracking-tight">
                            S/ {product.price.toFixed(2)}
                        </span>
                    </div>

                    <button className="w-full bg-foreground font-serif text-bocadillo-antique py-3 rounded-full text-sm font-medium hover:bg-bocadillo-hazelnut active:scale-[0.97] transition-all duration-200 shadow-md shadow-foreground/10">
                        VER DETALLE
                    </button>
                </div>
            </div>
        </div>
    );
}