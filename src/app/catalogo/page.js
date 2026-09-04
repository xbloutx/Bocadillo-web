"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

const CATEGORY_LABELS = {
    sandwiches: "Sandwiches",
    cupcakes: "Cupcakes",
    postres: "Postres",
    dulces: "Dulces",
};

export default function CatalagoPage() {
    const [activeCategory, setActiveCategory] = useState("todos");

    const categories = useMemo(() => {
        const present = [...new Set(products.map((product) => product.category))];
        return [
            { id: "todos", label: "Todos" },
            ...present.map((id) => ({ id, label: CATEGORY_LABELS[id] ?? id })),
        ];
    }, []);

    const filteredProducts =
        activeCategory === "todos"
            ? products
            : products.filter((product) => product.category === activeCategory);

    return (
        <MotionConfig reducedMotion="user">
        <main className="bg-background min-h-screen">
            <PageHeader title="CATÁLOGO" subtitle="Elige tus momentos favoritos ♡" />

            {/* Barra de categorías con fondo transparente/cristal ubicado a la mitad del corte */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 flex justify-center -mt-8">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/30 backdrop-blur-md p-2 rounded-full border border-black/5 shadow-lg shadow-black/5">
                    {categories.map((category) => {
                        const isActive = activeCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`relative px-6 py-2.5 rounded-full text-sm font-medium active:scale-95 transition-transform duration-150 ${
                                    isActive
                                        ? "text-bocadillo-antique"
                                        : "text-foreground hover:bg-bocadillo-antique/60"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="category-pill"
                                        className="absolute inset-0 bg-foreground rounded-full shadow-md shadow-foreground/10"
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10">{category.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Sección inferior con fondo blanco para las tarjetas */}
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 sm:px-8">
                {filteredProducts.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                >
                                    <ProductCard
                                        product={product}
                                        priority={index < 4}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <p className="font-serif text-center text-bocadillo-hazelnut py-12">
                        Todavía no hay productos en esta categoría. Vuelve pronto ♡
                    </p>
                )}
            </div>
        </main>
        </MotionConfig>
    );
}
