"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { products } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";

// 👇 LISTA DE FAVORITOS: Cambia o reordena los IDs de los combos que quieres mostrar en portada
const FAVORITE_PRODUCT_IDS = [1, 2, 3, 4, 8, 9, 10, 11, 13, 19, 21, 22];

export default function HomeFavorites() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Obtenemos los combos seleccionados por su ID respetando el orden de la lista
    const favoriteProducts = FAVORITE_PRODUCT_IDS
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean);

    return (
        <section className="relative pt-1 pb-10 sm:pt-4 sm:pb-20 bg-gradient-to-b from-transparent via-bocadillo-antique/20 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                {/* Cabecera minimalista y limpia */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-8 gap-2 sm:gap-4">
                    <div>
                        <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-bocadillo-copper/10 text-bocadillo-bark font-serif text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1.5 sm:mb-2.5">
                            Los más pedidos
                        </span>
                        <h2 className="font-serif font-black text-2xl sm:text-4xl text-bocadillo-walnut tracking-tight">
                            Los Favoritos de Casa ♡
                        </h2>
                    </div>

                    <Link
                        href="/catalogo"
                        className="font-serif text-xs sm:text-sm font-bold text-bocadillo-copper hover:text-bocadillo-walnut inline-flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
                    >
                        <span>Ver catálogo completo</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
                    </Link>
                </div>

                {/* Cuadrícula visual limpia con alineación superior independiente (items-start) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-start">
                    {favoriteProducts.map((product) => (
                        <div
                            key={product.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedProduct(product)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedProduct(product);
                                }
                            }}
                            aria-label={`Ver detalles de ${product.shortName || product.name}`}
                            className="group bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(71,33,13,0.09)] hover:-translate-y-1.5 active:scale-[0.97] transition-all duration-200 ease-out flex flex-col cursor-pointer text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-bocadillo-copper focus-visible:outline-offset-2"
                        >
                            {/* Fotografía protagonista */}
                            <div className="relative w-full aspect-square bg-[#FAF7F4] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
                                <Image
                                    src={product.image}
                                    alt={product.shortName || product.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                
                            </div>

                            {/* Título corto y precio limpio */}
                            <div className="flex flex-col items-center justify-between px-0.5">
                                <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-bocadillo-walnut group-hover:text-bocadillo-bark transition-colors line-clamp-2 text-center leading-snug">
                                    {product.shortName || product.name}
                                </h3>

                                <p className="font-serif text-xs sm:text-base font-black text-bocadillo-copper mt-1">
                                    S/ {product.price.toFixed(2)}
                                </p>

                                {/* Botón píldora: solo en desktop con hover desplegable; en móvil limpio estilo Dolce Capriccio */}
                                <div className="hidden sm:block w-full overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-2.5">
                                    <span className="inline-flex items-center justify-center w-full py-2 sm:py-2.5 px-4 rounded-full text-xs font-serif font-bold tracking-wider text-[#F6E9D9] bg-bocadillo-walnut group-hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-150 shadow-md shadow-bocadillo-walnut/15">
                                        VER DETALLE
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal interactivo con todo el contenido detallado y pedido por WhatsApp */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

