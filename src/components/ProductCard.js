import Image from "next/image";

export default function ProductCard({ product, priority = false, onSelect }) {
    const handleSelect = () => {
        if (onSelect) onSelect(product);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelect();
        }
    };

    return (
        <div 
            role="button"
            tabIndex={0}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            aria-label={`Ver detalle de ${product.shortName || product.name}`}
            className="group bg-paper rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(71,33,13,0.09)] hover:-translate-y-1.5 active:scale-[0.97] sm:active:scale-[0.98] transition-all duration-300 ease-out flex flex-col h-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-bocadillo-copper focus-visible:outline-offset-2"
        >

            {/* Imagen: aspect-square en móvil, h-60 en desktop */}
            <div className="relative w-full aspect-square sm:aspect-auto sm:h-60 bg-[#f5f5f7] overflow-hidden border-b border-black/[0.03]">
                <Image 
                    src={product.image}
                    alt={product.shortName || product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority={priority}
                    loading={priority ? "eager" : "lazy"}
                />

                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            {/* Contenido: móvil compacto centrado/limpio; desktop espacioso con botón */}
            <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="font-serif text-xs sm:text-sm text-bocadillo-walnut font-bold sm:font-medium leading-snug line-clamp-2 sm:line-clamp-3 group-hover:text-bocadillo-bark transition-colors">
                        {product.shortName || product.name}
                    </h3>

                    <p className="font-serif text-[11px] sm:text-xs text-bocadillo-copper mt-1 sm:mt-2 font-normal line-clamp-1">
                        {product.presentation}
                    </p>
                </div>

                <div className="mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-black/[0.04]">
                    {/* Precio: en móvil compacto y directo; en desktop con etiqueta PRECIO */}
                    <div className="flex items-baseline justify-between sm:mb-4">
                        <span className="hidden sm:inline text-xs uppercase tracking-wider text-bocadillo-copper font-bold">
                            Precio
                        </span>
                        <span className="font-serif text-sm sm:text-2xl font-black text-bocadillo-walnut tracking-tight">
                            S/ {product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Botón: oculto en móvil (toda la tarjeta es táctil), visible en desktop */}
                    <button 
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSelect();
                        }}
                        className="hidden sm:block w-full bg-bocadillo-walnut font-serif text-bocadillo-antique py-3 rounded-full text-xs font-bold tracking-wider hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-75 shadow-md shadow-bocadillo-walnut/15"
                    >
                        VER DETALLE
                    </button>
                </div>
            </div>
        </div>
    );
}