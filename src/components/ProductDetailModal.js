"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useDragControls, animate } from "framer-motion";
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";

const WHATSAPP_NUMBER = "51902733258";

export default function ProductDetailModal({ product, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth < 640;
        }
        return false;
    });

    // Gestos fluidos Framer Motion estilo Apple
    const y = useMotionValue(0);
    const backdropOpacity = useTransform(y, [0, 300], [1, 0]);
    const dragControls = useDragControls();

    const contentRef = useRef(null);
    const touchStartY = useRef(0);
    const isPullingDown = useRef(false);

    // Detección de dispositivo móvil
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Soporte táctil en el cuerpo deslizable para tirar hacia abajo cuando está arriba
    const handleContentTouchStart = (e) => {
        if (!isMobile) return;
        touchStartY.current = e.touches[0].clientY;
        isPullingDown.current = false;
    };

    const handleContentTouchMove = (e) => {
        if (!isMobile || !contentRef.current) return;
        const currentY = e.touches[0].clientY;
        const diff = currentY - touchStartY.current;

        // Si está en el tope del scroll y tira hacia abajo
        if (contentRef.current.scrollTop <= 0 && diff > 0) {
            isPullingDown.current = true;
            y.set(diff * 0.65);
        } else if (isPullingDown.current && diff <= 0) {
            isPullingDown.current = false;
            y.set(0);
        }
    };

    const handleContentTouchEnd = () => {
        if (!isMobile || !isPullingDown.current) return;
        isPullingDown.current = false;
        const currentY = y.get();
        if (currentY > 90) {
            onClose();
        } else {
            animate(y, 0, { type: "spring", damping: 28, stiffness: 320 });
        }
    };

    const images = product?.images && product.images.length > 0 
        ? product.images 
        : [product?.image || "/images/producto-1.webp"];

    // Cerrar con tecla Escape (accesibilidad estilo Apple)
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
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

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => (prev < 50 ? prev + 1 : prev));
    };

    const totalPrice = (product.price * quantity).toFixed(2);

    // Mensaje dinámico según la cantidad seleccionada
    const whatsappMessage = encodeURIComponent(
        quantity === 1
            ? `¡Hola Bocadillo! ♡ Me interesa pedir el combo:\n*${product.name}*\nCantidad: 1\nPrecio: S/ ${totalPrice}\n¿Tienen disponibilidad para coordinar la entrega?`
            : `¡Hola Bocadillo! ♡ Me interesa pedir:\n*${quantity} combos de ${product.name}*\nTotal: S/ ${totalPrice}\n¿Tienen disponibilidad para coordinar la entrega?`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    return (
        <div 
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-10 overflow-hidden"
        >
            {/* Backdrop oscurecido con desenfoque de fondo */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={isMobile ? { opacity: backdropOpacity } : undefined}
                transition={{ duration: 0.25 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                aria-hidden="true"
            />

            {/* Modal interactivo: Bottom Sheet en móvil / Split Modal de 2 columnas centrado en PC */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={isMobile ? { y: "100%", opacity: 0.9 } : { scale: 0.95, opacity: 0, y: 16 }}
                animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
                exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0, y: 16 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                style={isMobile ? { y } : undefined}
                drag={isMobile ? "y" : false}
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.05, bottom: 0.8 }}
                onDragEnd={(e, { offset, velocity }) => {
                    if (offset.y > 90 || velocity.y > 400) {
                        onClose();
                    } else {
                        animate(y, 0, { type: "spring", damping: 28, stiffness: 320 });
                    }
                }}
                className="relative w-full sm:max-w-4xl lg:max-w-5xl bg-paper rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden z-10 max-h-[92vh] sm:max-h-[88vh] flex flex-col border-t sm:border border-white/60 sm:border-black/[0.08]"
            >
                {/* Zona de Arrastre Superior (Grab Handle + Header táctil solo en móvil) */}
                <div
                    onPointerDown={(e) => {
                        if (!isMobile) return;
                        if (e.target.closest("button, a, input")) return;
                        dragControls.start(e);
                    }}
                    className="touch-none select-none cursor-grab active:cursor-grabbing sm:hidden"
                >
                    {/* Grab Handle nativo estilo iOS (solo móvil) */}
                    <div className="w-full pt-3 pb-1 flex items-center justify-center">
                        <div className="w-12 h-1.5 bg-black/20 hover:bg-black/35 rounded-full transition-colors" />
                    </div>

                    {/* Barra superior estilo Apple (solo en móvil) */}
                    <div className="flex items-center justify-between px-5 pt-0.5 pb-2.5 border-b border-black/5 bg-paper/85 backdrop-blur-md sticky top-0 z-20">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Cerrar detalle"
                            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-bocadillo-walnut active:scale-90 transition-transform duration-75 pointer-events-auto"
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>

                        <h2 id="modal-title-mobile" className="font-serif font-black text-xs uppercase tracking-widest text-bocadillo-walnut text-center pointer-events-none">
                            DETALLE DEL COMBO
                        </h2>

                        <div className="w-8" aria-hidden="true" />
                    </div>
                </div>

                {/* Estructura: 1 columna en móvil / 2 columnas divididas en PC */}
                <div className="flex flex-col sm:grid sm:grid-cols-12 flex-1 overflow-hidden min-h-0">
                    {/* COLUMNA IZQUIERDA: Carrusel de Fotos (Full alto en PC / Arriba en móvil) */}
                    <div className="w-full sm:col-span-5 lg:col-span-6 p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-bocadillo-antique/25 sm:border-r border-black/5 shrink-0">
                        <div className="relative w-full h-48 sm:h-[340px] lg:h-[400px] rounded-2xl overflow-hidden bg-white/70 border border-black/5 shadow-xs">
                            <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-medium bg-black/40 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                                Imágenes referenciales
                            </span>

                            <Image
                                src={images[currentImageIndex]}
                                alt={`${product.name} - foto ${currentImageIndex + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 520px"
                                className="object-cover transition-opacity duration-300"
                                priority
                            />

                            {/* Flechas de navegación (si hay más de 1 imagen) */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        aria-label="Foto anterior"
                                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 backdrop-blur-sm shadow flex items-center justify-center text-bocadillo-walnut hover:bg-white active:scale-90 transition-transform duration-75"
                                    >
                                        <FaChevronLeft className="text-[10px] sm:text-xs" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        aria-label="Siguiente foto"
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 backdrop-blur-sm shadow flex items-center justify-center text-bocadillo-walnut hover:bg-white active:scale-90 transition-transform duration-75"
                                    >
                                        <FaChevronRight className="text-[10px] sm:text-xs" />
                                    </button>
                                </>
                            )}

                            {/* Indicadores de posición (Dots) */}
                            {images.length > 1 && (
                                <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            aria-label={`Ir a foto ${idx + 1}`}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                idx === currentImageIndex 
                                                    ? "w-5 bg-bocadillo-walnut" 
                                                    : "w-1.5 bg-black/30 hover:bg-black/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Cabecera Desktop + Información detallada + Acciones */}
                    <div className="w-full sm:col-span-7 lg:col-span-6 flex flex-col flex-1 overflow-hidden min-h-0">
                        {/* Cabecera Desktop (solo en PC) */}
                        <div className="hidden sm:flex items-center justify-between px-6 lg:px-8 pt-5 pb-3.5 border-b border-black/5 bg-paper/90 backdrop-blur-md">
                            <h2 id="modal-title" className="font-serif font-black text-xs uppercase tracking-widest text-bocadillo-copper">
                                DETALLE DEL COMBO
                            </h2>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Cerrar ventana"
                                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 active:scale-90 flex items-center justify-center text-bocadillo-walnut transition-all cursor-pointer"
                            >
                                <FaXmark className="text-sm" />
                            </button>
                        </div>

                        {/* Contenido deslizable (Título, presentación, descripción, desglose) */}
                        <div
                            ref={contentRef}
                            onTouchStart={handleContentTouchStart}
                            onTouchMove={handleContentTouchMove}
                            onTouchEnd={handleContentTouchEnd}
                            className="overflow-y-auto overscroll-contain px-5 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex-1 space-y-4"
                        >
                            {/* Título y presentación */}
                            <div>
                                <h3 className="font-serif font-bold text-base sm:text-xl lg:text-2xl text-bocadillo-walnut leading-snug">
                                    {product.name}
                                </h3>

                                <div className="inline-block mt-2 px-2.5 py-0.5 bg-bocadillo-antique/50 rounded-full border border-bocadillo-copper/20">
                                    <span className="font-serif text-[11px] sm:text-xs font-semibold text-bocadillo-copper tracking-wide">
                                        Presentación: {product.presentation}
                                    </span>
                                </div>

                                {product.description && (
                                    <p className="text-xs sm:text-sm text-foreground/80 mt-2.5 leading-relaxed">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* Desglose de lo que incluye el Combo */}
                            {product.items && product.items.length > 0 && (
                                <div className="bg-bocadillo-antique/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-black/5">
                                    <h4 className="font-serif text-[11px] sm:text-xs font-black uppercase tracking-wider text-bocadillo-walnut mb-2">
                                        Este combo incluye:
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {product.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 font-medium">
                                                <span className="w-4 h-4 rounded-full bg-bocadillo-copper/20 text-bocadillo-copper flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <FiCheck className="text-[10px]" />
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Barra de acción inferior con Selector de Cantidad + WhatsApp */}
                        <div className="p-3.5 sm:p-5 lg:p-6 border-t border-black/5 bg-paper/95 backdrop-blur-md space-y-2.5 sm:space-y-3 shrink-0">
                            {/* Fila: Selector de Cantidad + Total */}
                            <div className="flex items-center justify-between px-1">
                                {/* Selector de cantidad interactivo */}
                                <div className="flex items-center gap-1.5 bg-bocadillo-antique/50 border border-bocadillo-copper/20 rounded-full p-0.5 sm:p-1">
                                    <button
                                        type="button"
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                        aria-label="Disminuir cantidad"
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                                    >
                                        <FiMinus className="text-xs sm:text-sm" />
                                    </button>
                                    <span className="w-7 sm:w-8 text-center font-serif font-black text-sm sm:text-base text-bocadillo-walnut select-none">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={increaseQuantity}
                                        aria-label="Aumentar cantidad"
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 transition-all shadow-xs"
                                    >
                                        <FiPlus className="text-xs sm:text-sm" />
                                    </button>
                                </div>

                                {/* Precio Total Dinámico */}
                                <div className="text-right">
                                    <span className="text-[10px] sm:text-xs uppercase font-bold text-bocadillo-copper block leading-none mb-0.5">
                                        Total ({quantity} {quantity === 1 ? "combo" : "combos"})
                                    </span>
                                    <span className="font-serif text-2xl sm:text-3xl font-black text-bocadillo-walnut tracking-tight leading-tight">
                                        S/ {totalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* Botón Verde Directo a WhatsApp */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 sm:py-3.5 px-5 sm:px-6 rounded-full font-serif font-bold text-sm tracking-wide shadow-md shadow-[#25D366]/25 active:scale-[0.98] transition-all duration-75"
                            >
                                <FaWhatsapp className="text-lg" />
                                <span>PEDIR POR WHATSAPP</span>
                            </a>

                            <p className="font-serif text-[10px] sm:text-xs text-center text-bocadillo-copper/80 font-medium leading-tight">
                                Coordinamos fecha de entrega, delivery o punto de recojo directamente por chat ♡
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
