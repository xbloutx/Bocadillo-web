"use client";

import { useOrder } from "@/context/OrderContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";

export default function OrderFloatingBar() {
    const { items, totalProductsCount, totalPrice, openOrderModal, isOrderModalOpen } = useOrder();

    // No mostrar la barra si no hay productos agregados o si el modal de resumen ya está abierto
    const isVisible = items.length > 0 && !isOrderModalOpen;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 80, opacity: 0, scale: 0.92 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 80, opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[420px] pointer-events-auto"
                >
                    <div 
                        onClick={openOrderModal}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openOrderModal();
                            }
                        }}
                        className="group flex items-center justify-between p-2 pl-3 sm:pl-3.5 bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_16px_40px_rgba(71,33,13,0.18)] hover:shadow-[0_20px_48px_rgba(71,33,13,0.22)] rounded-full transition-all duration-200 cursor-pointer active:scale-[0.98] ring-1 ring-black/[0.03]"
                    >
                        {/* Lado izquierdo: Ícono de bolsa + conteo y precio total */}
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bocadillo-antique/60 border border-bocadillo-copper/20 flex items-center justify-center text-bocadillo-walnut shrink-0 group-hover:scale-105 transition-transform">
                                <FiShoppingBag className="text-base sm:text-lg text-bocadillo-walnut" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-bocadillo-copper text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                                    {totalProductsCount}
                                </span>
                            </div>

                            <div className="min-w-0">
                                <p className="font-serif text-[11px] sm:text-xs text-bocadillo-copper font-medium truncate leading-tight">
                                    Tu Pedido ({totalProductsCount} {totalProductsCount === 1 ? "ítem" : "ítems"})
                                </p>
                                <p className="font-serif text-sm sm:text-base font-black text-bocadillo-walnut tracking-tight leading-tight">
                                    S/ {totalPrice}
                                </p>
                            </div>
                        </div>

                        {/* Lado derecho: Botón de acción */}
                        <div className="flex items-center gap-1.5 bg-bocadillo-walnut group-hover:bg-bocadillo-bark text-[#F6E9D9] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-serif font-bold text-xs sm:text-xs tracking-wider uppercase shadow-md shadow-bocadillo-walnut/20 shrink-0 transition-all duration-150">
                            <span>VER PEDIDO</span>
                            <FaChevronRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
