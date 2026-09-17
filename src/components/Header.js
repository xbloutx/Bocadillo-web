"use client";

import { useState, useEffect, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiGrid, FiX, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { LuCroissant, LuCakeSlice, LuPackage } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/context/OrderContext";

const NAV_ITEMS = [
    { href: "/", label: "INICIO" },
    { href: "/catalogo", label: "CATÁLOGO" },
    { href: "/pedidos", label: "PEDIDOS" },
    { href: "/nosotros", label: "NOSOTROS" },
    { href: "/contacto", label: "CONTACTO" },
];

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalProductsCount, openOrderModal } = useOrder();

    // Cerrar con Escape
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        },
        []
    );

    useEffect(() => {
        if (isMenuOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen, handleKeyDown]);

    return (
        <>
            <header className="sticky top-0 z-40 w-full flex justify-center px-3 py-2 sm:px-6 sm:py-3 transition-all duration-200">
                <div className="relative w-full max-w-6xl flex items-center justify-between px-3 sm:px-6 py-1.5 sm:py-2.5 bg-white/80 backdrop-blur-xl saturate-[180%] border border-white/60 shadow-[0_4px_24px_rgba(71,33,13,0.06)] rounded-full">
                    
                    {/* Botón Móvil: Menú / Categorías (44px touch target) */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Abrir categorías y menú"
                            className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-bocadillo-walnut/90 hover:bg-black/5 active:scale-90 transition-transform cursor-pointer"
                        >
                            <FiGrid className="text-xl" />
                        </button>
                    </div>

                    {/* Logo: Versión Desktop a la izquierda */}
                    <Link 
                        href="/" 
                        className="hidden md:block font-serif text-xl font-bold tracking-tight text-bocadillo-walnut active:scale-95 transition-transform duration-75"
                    >
                        BOCADILLO
                    </Link>

                    {/* Logo: Versión Móvil centrado y discreto (sin competir con el Hero) */}
                    <Link 
                        href="/" 
                        className="md:hidden absolute left-1/2 -translate-x-1/2 font-serif text-base font-bold text-bocadillo-walnut/85 active:scale-95 transition-transform pointer-events-auto"
                    >
                        BOCADILLO
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex gap-8 font-serif text-[15px] font-semibold tracking-wide text-bocadillo-walnut">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative pb-1 active:scale-95 transition-all duration-75 ${
                                        isActive
                                            ? "text-bocadillo-copper"
                                            : "hover:text-bocadillo-copper"
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-bocadillo-copper" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Acciones Derecha: Bolsa de Pedidos + WhatsApp */}
                    <div className="flex items-center gap-0.5 sm:gap-1.5">
                        <AnimatePresence>
                            {totalProductsCount > 0 && (
                                <motion.button
                                    key="header-order-bag"
                                    initial={{ scale: 0.7, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.7, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                                    whileTap={{ scale: 0.88 }}
                                    type="button"
                                    onClick={openOrderModal}
                                    aria-label={`Ver mi pedido (${totalProductsCount} productos)`}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-bocadillo-walnut/85 hover:text-bocadillo-walnut hover:bg-black/5 active:scale-90 transition-colors cursor-pointer"
                                >
                                    <motion.div
                                        key={totalProductsCount}
                                        initial={{ scale: 0.82 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                        className="flex items-center justify-center text-bocadillo-walnut"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-[21px] h-[21px]"
                                            aria-hidden="true"
                                        >
                                            {/* Asa estilizada de la bolsa Apple */}
                                            <path
                                                d="M8.5 7.2a3.5 3.5 0 0 1 7 0"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />
                                            {/* Cuerpo contorneado de la bolsa */}
                                            <path
                                                d="M5.4 7.2h13.2l1.1 12.3a1.8 1.8 0 0 1-1.8 1.8H6.1a1.8 1.8 0 0 1-1.8-1.8L5.4 7.2z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinejoin="round"
                                            />
                                            {/* Número integrado en el vientre de la bolsa */}
                                            <text
                                                x="12"
                                                y={totalProductsCount > 9 ? "16.8" : "16.5"}
                                                textAnchor="middle"
                                                fontSize={totalProductsCount > 99 ? "6.5" : totalProductsCount > 9 ? "7.5" : "8.5"}
                                                fontWeight="800"
                                                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                                                fill="currentColor"
                                            >
                                                {totalProductsCount > 99 ? "99+" : totalProductsCount}
                                            </text>
                                        </svg>
                                    </motion.div>
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <a
                            href="https://wa.me/51902733258"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contactar por WhatsApp"
                            className="w-10 h-10 -mr-1 rounded-full flex items-center justify-center text-bocadillo-walnut/80 hover:text-[#25D366] hover:bg-black/5 active:scale-90 transition-all duration-75"
                        >
                            <FaWhatsapp className="text-[21px] sm:text-[22px]" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Menú Móvil Desplegable (Apple Style Sheet) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div 
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsMenuOpen(false);
                        }}
                        className="fixed inset-0 z-50 md:hidden flex flex-col justify-start px-3 pt-3"
                    >
                        {/* Backdrop oscurecido al 80% uniforme con los modales de combos */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 will-change-[opacity]"
                        />

                        {/* Tarjeta Flotante del Menú */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.97 }}
                            transition={{ type: "spring", damping: 26, stiffness: 320 }}
                            className="relative w-full max-w-sm mx-auto bg-white/98 backdrop-blur-xl border border-bocadillo-copper/20 rounded-3xl p-5 shadow-2xl z-10"
                        >
                            {/* Cabecera del Drawer */}
                            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-bocadillo-copper/15">
                                <div>
                                    <span className="text-[10px] font-sans font-bold tracking-widest text-bocadillo-copper uppercase block">
                                        Explorar
                                    </span>
                                    <h3 className="font-serif text-lg font-bold text-bocadillo-walnut leading-tight">
                                        Bocadillo
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Cerrar menú"
                                    className="w-9 h-9 rounded-full bg-bocadillo-antique/60 text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 transition-all"
                                >
                                    <FiX className="text-lg" />
                                </button>
                            </div>

                            {/* Accesos Rápidos a Categorías de Combos */}
                            <div className="mb-4">
                                <p className="text-[11px] font-bold text-bocadillo-bark/75 tracking-wider uppercase mb-2 px-0.5">
                                    Categorías de Combos
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    <Link
                                        href="/catalogo?cat=salados"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-bocadillo-antique/40 hover:bg-bocadillo-antique/80 active:scale-95 transition-all text-center border border-bocadillo-copper/15"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-bocadillo-copper shadow-2xs mb-1.5">
                                            <LuCroissant className="text-base" />
                                        </div>
                                        <span className="text-xs font-bold text-bocadillo-walnut">Salados</span>
                                        <span className="text-[10px] text-bocadillo-bark/70">Combos</span>
                                    </Link>
                                    <Link
                                        href="/catalogo?cat=dulces"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-bocadillo-antique/40 hover:bg-bocadillo-antique/80 active:scale-95 transition-all text-center border border-bocadillo-copper/15"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-bocadillo-copper shadow-2xs mb-1.5">
                                            <LuCakeSlice className="text-base" />
                                        </div>
                                        <span className="text-xs font-bold text-bocadillo-walnut">Dulces</span>
                                        <span className="text-[10px] text-bocadillo-bark/70">Combos</span>
                                    </Link>
                                    <Link
                                        href="/catalogo?cat=boxes-escolares"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-bocadillo-antique/40 hover:bg-bocadillo-antique/80 active:scale-95 transition-all text-center border border-bocadillo-copper/15"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-bocadillo-copper shadow-2xs mb-1.5">
                                            <LuPackage className="text-base" />
                                        </div>
                                        <span className="text-xs font-bold text-bocadillo-walnut">Boxes</span>
                                        <span className="text-[10px] text-bocadillo-bark/70">Escolares</span>
                                    </Link>
                                </div>
                                <Link
                                    href="/catalogo"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mt-2.5 w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-bocadillo-walnut text-white font-serif text-xs font-bold tracking-wide hover:bg-bocadillo-bark active:scale-[0.98] transition-all shadow-sm"
                                >
                                    <span>Ver Todo el Catálogo</span>
                                    <FiArrowRight className="text-sm" />
                                </Link>
                            </div>

                            {/* Enlaces Principales del Sitio */}
                            <div className="pt-2 border-t border-bocadillo-copper/15 space-y-1">
                                {NAV_ITEMS.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                                                isActive
                                                    ? "bg-bocadillo-copper/15 text-bocadillo-copper font-bold"
                                                    : "text-bocadillo-walnut/80 hover:bg-black/5"
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            {isActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-bocadillo-copper" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* WhatsApp Directo */}
                            <div className="mt-3.5 pt-3 border-t border-bocadillo-copper/15">
                                <a
                                    href="https://wa.me/51902733258"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-sans font-bold text-xs border border-[#25D366]/25 active:scale-[0.98] transition-all"
                                >
                                    <FaWhatsapp className="text-base text-[#25D366]" />
                                    <span>Consultar por WhatsApp</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

