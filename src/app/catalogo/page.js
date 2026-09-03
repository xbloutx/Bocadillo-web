"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const categories = [
    { id: "todos", label: "Todos" },
    { id: "sandwiches", label: "Sandwiches" },
    { id: "cupcakes", label: "Cupcakes" },
    { id: "postres", label: "Postres" },
    { id: "dulces", label: "Dulces" },
];

export default function CatalagoPage() {
    const [activeCategory, setActiveCategory] = useState("todos");

    const filteredProducts =
        activeCategory === "todos"
            ? products
            : products.filter((product) => product.category === activeCategory);

    return (
        <main className="bg-background min-h-screen">
            {/* Sección superior con fondo crema */}
            <div className="bg-bocadillo-antique px-6 pt-16 pb-20 sm:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="font-serif font-black text-4xl sm:text-5xl text-foreground tracking-tight">
                        CATÁLOGO
                    </h1>
                    <p className="font-script text-2xl sm:text-3xl text-bocadillo-hazelnut mt-2">
                        Elige tus momentos favoritos ♡
                    </p>
                </div>
            </div>

            {/* Barra de categorías con fondo transparente/cristal ubicado a la mitad del corte */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 flex justify-center -mt-8">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/30 backdrop-blur-md p-2 rounded-full border border-black/5 shadow-lg shadow-black/5">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out active:scale-95 ${
                                activeCategory === category.id
                                    ? "bg-foreground text-bocadillo-antique shadow-md shadow-foreground/10"
                                    : "bg-bocadillo-antique/60 text-foreground hover:bg-bocadillo-antique border border-black/[0.04]"
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección inferior con fondo blanco para las tarjetas */}
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 sm:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            priority={index < 4}
                        /> 
                    ))}
                </div>
            </div>
        </main>
    );
}
