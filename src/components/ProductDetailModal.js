"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";

const WHATSAPP_NUMBER = "51902733258";

export default function ProductDetailModal({ product, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = product?.images && product.images.length > 0 
        ? product.images 
        : [product?.image || "/images/producto-1.png"];

    // Cerrar con tecla Escape (accesibilidad estilo Apple)
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        // Evitar scroll de fondo mientras el modal está abierto
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [handleKeyDown]);

    if (!product) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Mensaje pre-armado para WhatsApp
    const whatsappMessage = encodeURIComponent(
        `¡Hola Bocadillo! ♡ Me interesa pedir el combo:\n*${product.name}*\nPrecio: S/ ${product.price.toFixed(2)}\n¿Tienen disponibilidad para coordinar la entrega?`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop oscurecido con desenfoque de fondo */}
            <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-md"
                    aria-hidden="true"
                />

                {/* Modal / Sheet interactivo */}
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    initial={{ y: "100%", opacity: 0.9 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    className="relative w-full sm:max-w-lg bg-paper rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border-t sm:border border-white/60"
                >
                    {/* Barra superior estilo Apple con botón cerrar / atrás */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-black/5 bg-paper/80 backdrop-blur-md sticky top-0 z-20">
                        <button
                            onClick={onClose}
                            aria-label="Cerrar detalle"
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-bocadillo-walnut active:scale-90 transition-transform duration-75"
                        >
                            <FaChevronLeft className="text-sm sm:hidden" />
                            <FaXmark className="text-base hidden sm:block" />
                        </button>

                        <h2 id="modal-title" className="font-serif font-black text-sm uppercase tracking-widest text-bocadillo-walnut">
                            DETALLE DEL COMBO
                        </h2>

                        <div className="w-9" aria-hidden="true" />
                    </div>

                    {/* Contenido deslizable */}
                    <div className="overflow-y-auto px-6 py-4 flex-1 space-y-5">
                        {/* Carrusel de Imágenes */}
                        <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-bocadillo-antique/30 border border-black/5">
                            <span className="absolute top-3 right-3 z-10 text-[10px] font-medium bg-black/40 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                                Imágenes referenciales
                            </span>

                            <Image
                                src={images[currentImageIndex]}
                                alt={`${product.name} - foto ${currentImageIndex + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, 500px"
                                className="object-cover transition-opacity duration-300"
                                priority
                            />

                            {/* Flechas de navegación (si hay más de 1 imagen) */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        aria-label="Foto anterior"
                                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-bocadillo-walnut hover:bg-white active:scale-90 transition-transform duration-75"
                                    >
                                        <FaChevronLeft className="text-xs" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        aria-label="Siguiente foto"
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-bocadillo-walnut hover:bg-white active:scale-90 transition-transform duration-75"
                                    >
                                        <FaChevronRight className="text-xs" />
                                    </button>
                                </>
                            )}

                            {/* Indicadores de posición (Dots) */}
                            {images.length > 1 && (
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            aria-label={`Ir a foto ${idx + 1}`}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                idx === currentImageIndex 
                                                    ? "w-6 bg-bocadillo-walnut" 
                                                    : "w-1.5 bg-black/30 hover:bg-black/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Descripción y Contenido */}
                        <div>
                            <h3 className="font-serif font-bold text-lg text-bocadillo-walnut leading-snug">
                                {product.name}
                            </h3>

                            <div className="inline-block mt-2 px-3 py-1 bg-bocadillo-antique/50 rounded-full border border-bocadillo-copper/20">
                                <span className="font-serif text-xs font-semibold text-bocadillo-copper tracking-wide">
                                    Presentación: {product.presentation}
                                </span>
                            </div>

                            {product.description && (
                                <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        {/* Desglose de lo que incluye el Combo */}
                        {product.items && product.items.length > 0 && (
                            <div className="bg-bocadillo-antique/30 rounded-2xl p-4 border border-black/5">
                                <h4 className="font-serif text-xs font-black uppercase tracking-wider text-bocadillo-walnut mb-2.5">
                                    Este combo incluye:
                                </h4>
                                <ul className="space-y-2">
                                    {product.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 font-medium">
                                            <span className="w-5 h-5 rounded-full bg-bocadillo-copper/20 text-bocadillo-copper flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <FiCheck className="text-xs" />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Barra de acción inferior estilo Apple */}
                    <div className="p-5 border-t border-black/5 bg-paper/90 backdrop-blur-md space-y-3">
                        <div className="flex items-baseline justify-between px-1">
                            <span className="text-xs uppercase tracking-wider text-bocadillo-copper font-bold">
                                Total del combo
                            </span>
                            <span className="font-serif text-3xl font-black text-bocadillo-walnut tracking-tight">
                                S/ {product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* Botón Verde Directo a WhatsApp */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-full font-serif font-bold text-base shadow-lg shadow-[#25D366]/25 active:scale-[0.98] transition-all duration-75"
                        >
                            <FaWhatsapp className="text-xl" />
                            <span>PEDIR POR WHATSAPP</span>
                        </a>

                        <p className="text-[11px] text-center text-foreground/60">
                            Coordinamos fecha de entrega, delivery o punto de recojo directamente por chat ♡
                        </p>
                    </div>
                </motion.div>
            </div>
    );
}
