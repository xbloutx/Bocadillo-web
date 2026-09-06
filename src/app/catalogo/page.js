"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import ProductDetailModal from "@/components/ProductDetailModal";
import CustomOrderBanner from "@/components/CustomOrderBanner";
import { LuCakeSlice } from "react-icons/lu";

const ALL_CATEGORIES = [
    { id: "todos", label: "Todos" },
    { id: "dulces", label: "Dulces" },
    { id: "salados", label: "Salados" },
    { id: "boxes-escolares", label: "Boxes Escolares" },
];

function normalizeCategory(cat) {
    if (!cat) return "todos";
    const lower = cat.toLowerCase();
    if (lower === "salados" || lower === "sandwiches") return "salados";
    if (lower === "dulces") return "dulces";
    if (lower === "boxes" || lower === "boxes-escolares") return "boxes-escolares";
    return "todos";
}

function CatalogoContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const catQuery = searchParams.get("cat");

    // Single source of truth: la categoría activa se deriva directamente de la URL
    const activeCategory = useMemo(() => normalizeCategory(catQuery), [catQuery]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSelectCategory = (catId) => {
        const params = new URLSearchParams(searchParams.toString());
        if (catId === "todos") {
            params.delete("cat");
        } else {
            params.set("cat", catId);
        }
        const qs = params.toString();
        router.replace(qs ? `/catalogo?${qs}` : "/catalogo", { scroll: false });
    };

    const filteredProducts = useMemo(() => {
        if (activeCategory === "todos") return products;
        if (activeCategory === "salados") {
            return products.filter((p) => p.category === "salados" || p.category === "sandwiches");
        }
        if (activeCategory === "boxes-escolares") {
            return products.filter((p) => p.category === "boxes-escolares" || p.category === "boxes");
        }
        return products.filter((product) => product.category === activeCategory);
    }, [activeCategory]);

    return (
        <MotionConfig reducedMotion="user">
            <main className="bg-background min-h-screen">
                <PageHeader 
                    title="CATÁLOGO" 
                    subtitle="Elige tus momentos favoritos ♡" 
                />

                {/* Filtros de Categoría: Carrusel horizontal swipeable en móvil, píldora centrada en desktop */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 -mt-6 sm:-mt-8">
                    <div className="flex sm:justify-center overflow-x-auto no-scrollbar py-1">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-xl saturate-[180%] p-1 sm:p-2 rounded-full border border-white/60 shadow-lg shadow-bocadillo-walnut/5 mx-auto">
                            {ALL_CATEGORIES.map((category) => {
                                const isActive = activeCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => handleSelectCategory(category.id)}
                                        className={`relative px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap active:scale-95 transition-all duration-75 ${
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
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-8 pt-6 sm:pt-10 pb-16 sm:pb-20">
                    {filteredProducts.length > 0 ? (
                        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 items-start">
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
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-bocadillo-copper shadow-xs mx-auto mb-3">
                                <LuCakeSlice className="text-2xl" />
                            </div>
                            <h3 className="font-serif font-bold text-lg text-bocadillo-walnut">
                                Próximamente en esta categoría
                            </h3>
                            <p className="font-serif text-sm text-bocadillo-copper mt-2">
                                Estamos horneando novedades. Si tienes un antojo o pedido especial, ¡escríbenos por WhatsApp y lo armamos para ti!
                            </p>
                            <button
                                onClick={() => handleSelectCategory("todos")}
                                className="mt-5 px-6 py-2 bg-bocadillo-walnut text-bocadillo-antique rounded-full text-xs font-bold tracking-wider active:scale-95 transition-transform duration-75"
                            >
                                VER TODOS LOS COMBOS
                            </button>
                        </div>
                    )}

                    <CustomOrderBanner />
                </div>

                <AnimatePresence>
                    {selectedProduct && (
                        <ProductDetailModal
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    )}
                </AnimatePresence>
            </main>
        </MotionConfig>
    );
}

export default function CatalogoPage() {
    return (
        <Suspense fallback={
            <main className="bg-background min-h-screen">
                <PageHeader title="CATÁLOGO" subtitle="Elige tus momentos favoritos ♡" />
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <p className="font-serif text-bocadillo-copper">Cargando catálogo...</p>
                </div>
            </main>
        }>
            <CatalogoContent />
        </Suspense>
    );
}
