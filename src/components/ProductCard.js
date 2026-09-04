import Image from "next/image";

export default function ProductCard({ product, priority = false, onSelect }) {
    const handleSelect = () => {
        if (onSelect) onSelect(product);
    };

    return (
        <div 
            onClick={handleSelect}
            className="group bg-paper rounded-3xl overflow-hidden border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(71,33,13,0.09)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 ease-out flex flex-col h-full cursor-pointer"
        >
            {/* Contenedor de la imagen */}
            <div className="relative w-full h-60 bg-[#f5f5f7] overflow-hidden border-b border-black/[0.03]">
                <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority={priority}
                />
                {/* Sutil sombra interior para enmarcar la foto */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="font-serif text-sm text-bocadillo-walnut font-medium leading-snug line-clamp-3">
                        {product.name}
                    </h3>

                    <p className="font-serif text-xs text-bocadillo-copper mt-2 font-normal">
                        Presentación: {product.presentation}
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.04]">
                    <div className="flex items-baseline justify-between mb-4">
                        <span className="text-xs uppercase tracking-wider text-bocadillo-copper font-bold">
                            Precio
                        </span>
                        <span className="font-serif text-2xl font-black text-bocadillo-walnut tracking-tight">
                            S/ {product.price.toFixed(2)}
                        </span>
                    </div>

                    <button 
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSelect();
                        }}
                        className="w-full bg-bocadillo-walnut font-serif text-bocadillo-antique py-3 rounded-full text-xs font-bold tracking-wider hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-75 shadow-md shadow-bocadillo-walnut/15"
                    >
                        VER DETALLE
                    </button>
                </div>
            </div>
        </div>
    );
}