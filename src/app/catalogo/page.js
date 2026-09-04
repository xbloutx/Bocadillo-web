"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import ProductDetailModal from "@/components/ProductDetailModal";
import CustomOrderBanner from "@/components/CustomOrderBanner";

const ALL_CATEGORIES = [
    { id: "todos", label: "Todos" },
    { id: "sandwiches", label: "Sandwiches" },
    { id: "cupcakes", label: "Cupcakes" },
    { id: "postres", label: "Postres" },
    { id: "dulces", label: "Dulces" },
    { id: "bebidas", label: "Bebidas" },
];

export default function CatalogoPage() {
    const [activeCategory, setActiveCategory] = useState("todos");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "todos") return products;
        return products.filter((product) => product.category === activeCategory);
    }, [activeCategory]);

    return (
        <MotionConfig reducedMotion="user">
            <main className="bg-background min-h-screen">
                <PageHeader 
                    title="CATÁLOGO" 
                    subtitle="Elige tus momentos favoritos ♡" 
                />

                {/* Barra de categorías con acabado translúcido Apple (backdrop-blur + ring de luz) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex justify-center -mt-8">
                    <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-xl saturate-[180%] p-1.5 sm:p-2 rounded-full border border-white/60 shadow-lg shadow-bocadillo-walnut/5">
                        {ALL_CATEGORIES.map((category) => {
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide active:scale-95 transition-all duration-75 ${
                                        isActive
                                            ? "text-bocadillo-antique"
                                            : "text-bocadillo-walnut/80 hover:text-bocadillo-walnut hover:bg-black/[0.03]"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="category-pill"
                                            className="absolute inset-0 bg-bocadillo-walnut rounded-full shadow-md shadow-bocadillo-walnut/20"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                                        />
                                    )}
                                    <span className="relative z-10">{category.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Contenido principal del catálogo */}
                <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 sm:px-8">
                    {filteredProducts.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                                    >
                                        <ProductCard
                                            product={product}
                                            priority={index < 4}
                                            onSelect={setSelectedProduct}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 px-6 bg-bocadillo-antique/20 rounded-3xl border border-black/5 max-w-xl mx-auto my-6">
                            <span className="text-3xl mb-3 block">🧁</span>
                            <h3 className="font-serif font-bold text-lg text-bocadillo-walnut">
                                Próximamente en esta categoría
                            </h3>
                            <p className="font-serif text-sm text-bocadillo-copper mt-2">
                                Estamos horneando novedades. Si tienes un antojo o pedido especial, ¡escríbenos por WhatsApp y lo armamos para ti!
                            </p>
                            <button
                                onClick={() => setActiveCategory("todos")}
                                className="mt-5 px-6 py-2 bg-bocadillo-walnut text-bocadillo-antique rounded-full text-xs font-bold tracking-wider active:scale-95 transition-transform duration-75"
                            >
                                VER TODOS LOS COMBOS
                            </button>
                        </div>
                    )}

                    {/* Banner inferior: "¿Prefieres algo personalizado?" */}
                    <CustomOrderBanner />
                </div>

                {/* Modal / Sheet interactivo para ver el detalle del combo */}
                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </main>
        </MotionConfig>
    );
}
