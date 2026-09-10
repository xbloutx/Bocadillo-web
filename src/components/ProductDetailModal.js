"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useDragControls, animate } from "framer-motion";
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
    const dragControls = useDragControls();

    // Gestos táctiles de deslizamiento horizontal para el carrusel en móvil
    const touchCarouselStartX = useRef(0);
    const touchCarouselEndX = useRef(0);

    const handleCarouselTouchStart = (e) => {
        touchCarouselStartX.current = e.touches[0].clientX;
        touchCarouselEndX.current = e.touches[0].clientX;
    };

    const handleCarouselTouchMove = (e) => {
        touchCarouselEndX.current = e.touches[0].clientX;
    };

    const handleCarouselTouchEnd = () => {
        const diffX = touchCarouselStartX.current - touchCarouselEndX.current;
        const minSwipeDistance = 40;
        if (diffX > minSwipeDistance) {
            nextImage();
        } else if (diffX < -minSwipeDistance) {
            prevImage();
        }
    };

    // Detección de dispositivo móvil
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const images = product?.images && product.images.length > 0 
        ? product.images 
        : [product?.image || "/images/producto-1.webp"];

    // Estados de navegación en 2 pasos
    const [step, setStep] = useState("detail"); // "detail" | "checkout"
    const [direction, setDirection] = useState(1); // 1 = adelante, -1 = atrás

    const goToCheckout = useCallback(() => {
        setDirection(1);
        setStep("checkout");
    }, []);

    const goToDetail = useCallback(() => {
        setDirection(-1);
        setStep("detail");
    }, []);


    // Inicializar datos del cliente (recupera de localStorage si existen previos)
    const [formData, setFormData] = useState(() => {
        let savedData = {};
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("bocadillo_customer_details");
                if (saved) savedData = JSON.parse(saved);
            } catch (_) {}
        }
        const savedFullName = savedData.fullName || (savedData.firstName ? `${savedData.firstName} ${savedData.lastName || ""}`.trim() : "");
        return {
            fullName: savedFullName,
            deliveryDate: "",
            deliveryTime: "",
            addressDistrict: savedData.addressDistrict || "",
            reference: savedData.reference || "",
            note: "",
        };
    });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            const next = { ...prev, [field]: value };
            if (["fullName", "addressDistrict", "reference"].includes(field)) {
                try {
                    localStorage.setItem(
                        "bocadillo_customer_details",
                        JSON.stringify({
                            fullName: next.fullName,
                            addressDistrict: next.addressDistrict,
                            reference: next.reference,
                        })
                    );
                } catch (_) {}
            }
            return next;
        });
        if (formErrors[field]) {
            setFormErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const getTodayDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleSendWhatsApp = (e) => {
        if (e) e.preventDefault();
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = true;
        if (!formData.deliveryDate) errors.deliveryDate = true;
        if (!formData.deliveryTime) errors.deliveryTime = true;
        if (!formData.addressDistrict.trim()) errors.addressDistrict = true;

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const clientName = formData.fullName.trim();
        const referenceText = formData.reference.trim() ? formData.reference.trim() : "Ninguna";
        const commentLine = formData.note && formData.note.trim() ? `\n• *Comentario:* ${formData.note.trim()}` : "";

        const text = `¡Hola Bocadillo! ♡ Quisiera realizar este pedido:

🛍️ *DETALLE DEL PEDIDO:*
• *Producto:* ${product.name}
• *Cantidad:* ${currentQty} ${unitText}
• *Total estimado:* S/ ${totalPrice}

📍 *DATOS DE ENTREGA:*
• *Cliente:* ${clientName}
• *Fecha de entrega:* ${formData.deliveryDate}
• *Hora aproximada:* ${formData.deliveryTime}
• *Dirección y Distrito:* ${formData.addressDistrict.trim()}
• *Referencia:* ${referenceText}${commentLine}

¿Me confirman disponibilidad para coordinar el pago y la entrega? ¡Muchas gracias! ♡`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    // Cerrar con tecla Escape o retroceder de paso suavemente
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") {
                if (step === "checkout") {
                    goToDetail();
                } else {
                    onClose();
                }
            }
        },
        [onClose, step, goToDetail]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [handleKeyDown]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleQuantityChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setQuantity("");
            return;
        }
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
            setQuantity(Math.min(num, 999));
        }
    };

    const handleQuantityBlur = () => {
        if (!quantity || Number(quantity) < 1) {
            setQuantity(1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (Number(prev) > 1 ? Number(prev) - 1 : 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => (Number(prev) < 999 ? Number(prev) + 1 : prev));
    };

    const currentQty = typeof quantity === "number" && quantity >= 1 ? quantity : 1;
    const totalPrice = (product?.price ? (product.price * currentQty).toFixed(2) : "0.00");

    const unitText = product?.unitLabel 
        ? (currentQty === 1 ? product.unitLabel.singular : product.unitLabel.plural)
        : (currentQty === 1 ? "unidad" : "unidades");

    // Variantes de transición cinemática fluida estilo Apple (Desplazamiento + Desenfoque sutil + Opacidad)
    const stepVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 32 : -32,
            opacity: 0,
            filter: "blur(4px)",
        }),
        center: {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
        },
        exit: (dir) => ({
            x: dir > 0 ? -32 : 32,
            opacity: 0,
            filter: "blur(4px)",
        }),
    };

    // Componente reutilizable del carrusel de fotografías con soporte de swipe táctil
    const renderCarousel = (heightClass = "h-[340px] lg:h-[400px]") => (
        <div 
            onTouchStart={images.length > 1 ? handleCarouselTouchStart : undefined}
            onTouchMove={images.length > 1 ? handleCarouselTouchMove : undefined}
            onTouchEnd={images.length > 1 ? handleCarouselTouchEnd : undefined}
            className={`relative w-full ${heightClass} rounded-2xl overflow-hidden bg-white/70 border border-black/5 shadow-xs select-none touch-pan-y`}
        >
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
                        type="button"
                        onClick={prevImage}
                        aria-label="Foto anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-bocadillo-walnut hover:bg-white active:scale-90 transition-transform duration-75 cursor-pointer z-10"
                    >
                        <FaChevronLeft className="text-xs sm:text-sm" />
                    </button>
                    <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Siguiente foto"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-bocadillo-walnut hover:bg-white active:scale-90 transition-transform duration-75 cursor-pointer z-10"
                    >
                        <FaChevronRight className="text-xs sm:text-sm" />
                    </button>
                </>
            )}

            {/* Indicadores de posición (Dots) */}
            {images.length > 1 && (
                <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentImageIndex(idx)}
                            aria-label={`Ir a foto ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === currentImageIndex 
                                    ? "w-5 bg-bocadillo-walnut" 
                                    : "w-1.5 bg-black/30 hover:bg-black/50"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    if (!product) return null;

    return (
        <div 
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 h-dvh z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-10 overflow-hidden"
        >
            {/* Backdrop oscurecido optimizado por GPU (sin blur fullscreen para fluidez instantánea a 60fps) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 will-change-[opacity]"
                aria-hidden="true"
            />

            {/* Modal interactivo: Bottom Sheet en móvil / Split Modal de 2 columnas centrado en PC con altura fluida adaptable */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={isMobile ? { y: "100%", opacity: 0.9 } : { scale: 0.95, opacity: 0, y: 16 }}
                animate={
                    isMobile 
                        ? { 
                            y: 0, 
                            opacity: 1,
                          } 
                        : { 
                            scale: 1, 
                            opacity: 1, 
                            y: 0, 
                          }
                }
                exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0, y: 16 }}
                transition={{ 
                    type: "spring", 
                    damping: 28, 
                    stiffness: 300,
                }}
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
                className="relative w-full sm:max-w-3xl lg:max-w-[940px] bg-paper rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden z-10 h-[93dvh] max-h-[93dvh] sm:h-auto sm:max-h-[88vh] flex flex-col border-t sm:border border-white/60 sm:border-black/[0.08]"
            >
                {/* Contenedor principal de contenido */}
                <div className="flex flex-col w-full h-full flex-1 min-h-0">
                    {/* Zona de Arrastre Superior (Grab Handle + Header táctil solo en móvil) */}
                    <div
                        onPointerDown={(e) => {
                            if (!isMobile) return;
                            if (e.target.closest("button, a, input")) return;
                            dragControls.start(e);
                        }}
                        className="touch-none select-none cursor-grab active:cursor-grabbing sm:hidden shrink-0"
                    >
                    {/* Grab Handle nativo estilo iOS (solo móvil) */}
                    <div className="w-full pt-3 pb-1 flex items-center justify-center">
                        <div className="w-12 h-1.5 bg-black/20 hover:bg-black/35 rounded-full transition-colors" />
                    </div>

                    {/* Barra superior estilo Apple (solo en móvil) */}
                    <div className="flex items-center justify-between px-4 pt-0.5 pb-2.5 border-b border-black/5 bg-paper/85 backdrop-blur-md sticky top-0 z-20 h-11">
                        {step === "checkout" ? (
                            <button
                                type="button"
                                onClick={goToDetail}
                                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 active:scale-90 flex items-center justify-center text-bocadillo-walnut transition-transform cursor-pointer"
                                aria-label="Volver a la información del combo"
                            >
                                <FaChevronLeft className="text-xs" />
                            </button>
                        ) : (
                            <div className="w-8 h-8" aria-hidden="true" />
                        )}

                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            <motion.h2
                                key={`sheet-title-${step}`}
                                initial={{ opacity: 0, y: direction > 0 ? 8 : -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
                                transition={{ duration: 0.18 }}
                                className="font-serif font-black text-xs uppercase tracking-widest text-bocadillo-walnut text-center pointer-events-none"
                            >
                                {step === "checkout" ? "DATOS DE ENTREGA" : "DETALLE DEL COMBO"}
                            </motion.h2>
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Cerrar ventana"
                            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-bocadillo-walnut active:scale-90 transition-transform pointer-events-auto cursor-pointer"
                        >
                            <FaXmark className="text-xs" />
                        </button>
                    </div>
                </div>

                {/* Cabecera Desktop Completa (Abarca de lado a lado en PC) */}
                <div className="hidden sm:flex items-center justify-between px-6 lg:px-8 py-3.5 border-b border-black/5 bg-paper/95 backdrop-blur-md relative shrink-0 z-20">
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            {step === "checkout" ? (
                                <motion.div
                                    key="desktop-header-checkout"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex items-center gap-3"
                                >
                                    <button
                                        type="button"
                                        onClick={goToDetail}
                                        className="group inline-flex items-center gap-1.5 font-serif text-xs font-bold text-bocadillo-copper hover:text-bocadillo-walnut active:scale-95 transition-all cursor-pointer"
                                    >
                                        <FaChevronLeft className="text-[10px] group-hover:-translate-x-0.5 transition-transform" />
                                        <span>Volver al combo</span>
                                    </button>
                                    <span className="text-black/20 text-xs">/</span>
                                    <h2 className="font-serif font-black text-xs uppercase tracking-widest text-bocadillo-walnut">
                                        DATOS DE ENTREGA
                                    </h2>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="desktop-header-detail"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex items-center gap-3 flex-wrap min-w-0"
                                >
                                    <h2 id="modal-title" className="font-serif font-bold text-base lg:text-lg text-bocadillo-walnut leading-snug">
                                        {product.name}
                                    </h2>
                                    <div className="inline-block px-2.5 py-0.5 bg-bocadillo-antique/60 rounded-full border border-bocadillo-copper/20 shadow-2xs shrink-0">
                                        <span className="font-serif text-[11px] font-semibold text-bocadillo-copper tracking-wide">
                                            Presentación: {product.presentation}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar ventana"
                        className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 active:scale-90 flex items-center justify-center text-bocadillo-walnut transition-all cursor-pointer shrink-0 ml-3"
                    >
                        <FaXmark className="text-sm" />
                    </button>
                </div>

                {/* Estructura: 1 columna en móvil / 2 columnas divididas al 50-50 en PC para máxima apreciación fotográfica */}
                <div className="flex flex-col sm:grid sm:grid-cols-12 flex-1 overflow-hidden min-h-0">
                    {/* COLUMNA IZQUIERDA: Galería fotográfica en proporción cuadrada íntegra (sin márgenes sobrantes) */}
                    <div className="hidden sm:flex sm:col-span-6 p-4 lg:p-5 flex-col justify-center items-center bg-bocadillo-antique/20 sm:border-r border-black/5 shrink-0">
                        <div className="w-full max-w-[340px] lg:max-w-[365px]">
                            {renderCarousel("aspect-square w-full")}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Contenido Animado (Paso 1: Detalle | Paso 2: Formulario de Entrega) */}
                    <div className="w-full sm:col-span-6 flex flex-col flex-1 overflow-hidden min-h-0 relative">
                        {/* Contenedor Animado de Pasos (AnimatePresence mode="popLayout" para sincronizar la altura de inmediato) */}
                        <div className="flex-1 overflow-hidden relative flex flex-col min-h-0 w-full">
                            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                                {step === "detail" ? (
                                    <motion.div
                                        key="step-detail"
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                                            opacity: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                                            filter: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
                                        }}
                                        className="flex flex-col flex-1 overflow-hidden h-full min-h-0 w-full"
                                    >
                                        {/* PASO 1: Información detallada del combo con scroll natural */}
                                        <div
                                            className="overflow-y-auto overscroll-contain px-5 sm:px-6 lg:px-7 pt-3.5 sm:pt-4 pb-4 sm:pb-4 flex-1 min-h-0 space-y-3 sm:space-y-3.5"
                                        >
                                            {/* En móvil: Carrusel integrado en el scroll con proporción generosa para apreciar el combo al 100% */}
                                            <div className="sm:hidden">
                                                {renderCarousel("aspect-square max-h-[285px] xs:max-h-[320px]")}
                                            </div>

                                            {/* Título y presentación (visible solo en móvil, en PC se luce en la cabecera superior completa) */}
                                            <div className="sm:hidden pt-0.5 space-y-1.5">
                                                <h3 className="font-serif font-bold text-base text-bocadillo-walnut leading-snug">
                                                    {product.name}
                                                </h3>

                                                <div className="inline-block px-2.5 py-0.5 bg-bocadillo-antique/60 rounded-full border border-bocadillo-copper/20 shadow-2xs">
                                                    <span className="font-serif text-[11px] font-semibold text-bocadillo-copper tracking-wide">
                                                        Presentación: {product.presentation}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Descripción artesanal */}
                                            {product.description && (
                                                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            )}

                                            {/* Desglose de lo que incluye el Combo */}
                                            {product.items && product.items.length > 0 && (
                                                <div className="bg-bocadillo-antique/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-black/5">
                                                    <h4 className="font-serif text-[11px] sm:text-xs font-black uppercase tracking-wider text-bocadillo-walnut mb-2">
                                                        Este combo incluye:
                                                    </h4>
                                                    <ul className="space-y-1.5 sm:space-y-2">
                                                        {product.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
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

                                        {/* Barra de acción Paso 1: Cantidad + Total + Continuar */}
                                        <div className="p-3 sm:p-4 sm:px-6 lg:px-7 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-black/5 bg-paper/95 backdrop-blur-md space-y-2 sm:space-y-2.5 shrink-0">
                                            <div className="flex items-center justify-between px-1">
                                                {/* Selector de cantidad interactivo editable */}
                                                <div className="flex items-center gap-1.5 bg-bocadillo-antique/50 border border-bocadillo-copper/20 rounded-full p-0.5 sm:p-1">
                                                    <button
                                                        type="button"
                                                        onClick={decreaseQuantity}
                                                        disabled={currentQty <= 1}
                                                        aria-label="Disminuir cantidad"
                                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 cursor-pointer"
                                                    >
                                                        <FiMinus className="text-xs sm:text-sm" />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="999"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                        onFocus={(e) => e.target.select()}
                                                        onClick={(e) => e.target.select()}
                                                        onBlur={handleQuantityBlur}
                                                        aria-label="Cantidad a pedir"
                                                        className="w-11 sm:w-12 text-center font-serif font-black text-base text-bocadillo-walnut bg-transparent focus:outline-none focus:bg-white/80 rounded transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={increaseQuantity}
                                                        aria-label="Aumentar cantidad"
                                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 transition-all shadow-xs shrink-0 cursor-pointer"
                                                    >
                                                        <FiPlus className="text-xs sm:text-sm" />
                                                    </button>
                                                </div>

                                                {/* Precio Total Dinámico */}
                                                <div className="text-right">
                                                    <span className="text-[10px] sm:text-xs uppercase font-bold text-bocadillo-copper block leading-none mb-0.5">
                                                        Total ({currentQty} {unitText})
                                                    </span>
                                                    <span className="font-serif text-2xl sm:text-3xl font-black text-bocadillo-walnut tracking-tight leading-tight">
                                                        S/ {totalPrice}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Botón para avanzar a Datos de Entrega con microinteracción Apple */}
                                            <button
                                                type="button"
                                                onClick={goToCheckout}
                                                className="group w-full flex items-center justify-center gap-2 bg-bocadillo-walnut hover:bg-bocadillo-bark text-[#F6E9D9] py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-bocadillo-walnut/20 active:scale-[0.98] transition-all duration-75 cursor-pointer"
                                            >
                                                <span>CONTINUAR CON EL PEDIDO</span>
                                                <FaChevronRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                                            </button>

                                            <p className="font-serif text-[10px] sm:text-xs text-center text-bocadillo-copper/80 font-medium leading-tight">
                                                Paso 1 de 2: Personaliza tu cantidad antes de ingresar tus datos de entrega ♡
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step-checkout"
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                                            opacity: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                                            filter: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
                                        }}
                                        className="flex flex-col flex-1 overflow-hidden h-full min-h-0 w-full"
                                    >
                                        {/* PASO 2: Formulario de Datos de Entrega */}
                                        <div className="overflow-y-auto overscroll-contain px-5 sm:px-6 lg:px-7 py-3.5 sm:py-4.5 flex-1 min-h-0 space-y-3.5">
                                            {/* Resumen del Pedido: Tarjeta enriquecida para apreciar claramente lo que compran */}
                                            <div className="p-3 sm:p-3.5 bg-bocadillo-antique/45 rounded-2xl border border-bocadillo-copper/25 shadow-2xs">
                                                {/* En móvil: Vista enriquecida con foto generosa (80px), nombre completo y desglose */}
                                                <div className="flex items-center gap-3.5 sm:hidden">
                                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white shrink-0 shadow-xs border border-black/8 ring-1 ring-black/5">
                                                        <Image 
                                                            src={images[0]} 
                                                            alt={product.name} 
                                                            fill 
                                                            sizes="80px" 
                                                            className="object-cover" 
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0 space-y-1">
                                                        <p className="font-serif font-bold text-xs text-bocadillo-walnut leading-snug line-clamp-2">
                                                            {product.name}
                                                        </p>
                                                        {product.items && product.items.length > 0 ? (
                                                            <p className="text-[10px] text-bocadillo-copper font-medium line-clamp-1">
                                                                Incluye: {product.items.join(" · ")}
                                                            </p>
                                                        ) : product.presentation ? (
                                                            <div className="inline-block px-2 py-0.5 bg-white/80 rounded-full border border-bocadillo-copper/20">
                                                                <span className="font-serif text-[10px] font-semibold text-bocadillo-copper">
                                                                    {product.presentation}
                                                                </span>
                                                            </div>
                                                        ) : null}
                                                        <div className="flex items-center justify-between pt-0.5 border-t border-black/5 text-[11px] text-bocadillo-copper">
                                                            <span>Cant: <strong className="text-bocadillo-walnut font-bold">{currentQty} {unitText}</strong></span>
                                                            <span>Total: <strong className="font-serif text-xs font-black text-bocadillo-walnut">S/ {totalPrice}</strong></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* En escritorio: Barra compacta limpia (la columna izquierda ya luce la foto grande) */}
                                                <div className="hidden sm:flex sm:items-center sm:justify-between text-xs sm:text-sm">
                                                    <span className="font-serif text-bocadillo-copper font-medium">
                                                        Cantidad seleccionada: <strong className="text-bocadillo-walnut font-bold">{currentQty} {unitText}</strong>
                                                    </span>
                                                    <span className="text-black/20">·</span>
                                                    <span className="font-serif text-bocadillo-copper font-medium">
                                                        Total a pagar: <strong className="font-serif text-sm sm:text-base font-black text-bocadillo-walnut">S/ {totalPrice}</strong>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Campos del Formulario de Entrega */}
                                            <form onSubmit={handleSendWhatsApp} className="space-y-3 sm:space-y-3.5">
                                                {/* Nombre y Apellido */}
                                                <div>
                                                    <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                        Nombre y Apellido <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.fullName}
                                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                                        placeholder="Ej: Rocio Tacza"
                                                        className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border text-base sm:text-sm text-bocadillo-walnut placeholder:text-bocadillo-walnut/35 focus:outline-none transition-all ${
                                                            formErrors.fullName 
                                                                ? "border-red-400 bg-red-50/40 ring-1 ring-red-400" 
                                                                : "border-bocadillo-copper/25 focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper"
                                                        }`}
                                                    />
                                                </div>

                                                {/* Fecha y Hora de entrega */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                    <div>
                                                        <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                            Fecha entrega <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            min={getTodayDate()}
                                                            value={formData.deliveryDate}
                                                            onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                                                            className={`w-full px-3 py-2 sm:py-2.5 rounded-xl bg-white border text-base sm:text-sm text-bocadillo-walnut focus:outline-none transition-all ${
                                                                formErrors.deliveryDate 
                                                                    ? "border-red-400 bg-red-50/40 ring-1 ring-red-400" 
                                                                    : "border-bocadillo-copper/25 focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper"
                                                            }`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                            Hora <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="time"
                                                            value={formData.deliveryTime}
                                                            onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                                                            className={`w-full px-3 py-2 sm:py-2.5 rounded-xl bg-white border text-base sm:text-sm text-bocadillo-walnut focus:outline-none transition-all ${
                                                                formErrors.deliveryTime 
                                                                    ? "border-red-400 bg-red-50/40 ring-1 ring-red-400" 
                                                                    : "border-bocadillo-copper/25 focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper"
                                                            }`}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Dirección con Distrito */}
                                                <div>   
                                                    <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                        Dirección y Distrito <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.addressDistrict}
                                                        onChange={(e) => handleInputChange("addressDistrict", e.target.value)}
                                                        placeholder="Ej: Av. San Martín 450, Magdalena"
                                                        className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border text-base sm:text-sm text-bocadillo-walnut placeholder:text-bocadillo-walnut/35 focus:outline-none transition-all ${
                                                            formErrors.addressDistrict 
                                                                ? "border-red-400 bg-red-50/40 ring-1 ring-red-400" 
                                                                : "border-bocadillo-copper/25 focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper"
                                                        }`}
                                                    />
                                                </div>

                                                {/* Referencia */}
                                                <div>
                                                    <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                        Referencia (Opcional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.reference}
                                                        onChange={(e) => handleInputChange("reference", e.target.value)}
                                                        placeholder="Ej: Casa blanca, timbre 202, frente al parque"
                                                        className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-bocadillo-copper/25 text-base sm:text-sm text-bocadillo-walnut placeholder:text-bocadillo-walnut/35 focus:outline-none focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper transition-all"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                        Comentario
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.note}
                                                        onChange={(e) => handleInputChange("note", e.target.value)}
                                                        placeholder="Ej: Pedido para el día de la madre"
                                                        className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-bocadillo-copper/25 text-base sm:text-sm text-bocadillo-walnut placeholder:text-bocadillo-walnut/35 focus:outline-none focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper transition-all"
                                                    />
                                                </div>
                                            </form>
                                        </div>

                                        {/* Barra de acción Paso 2: Botón Final WhatsApp */}
                                        <div className="p-3 sm:p-4 sm:px-6 lg:px-7 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-black/5 bg-paper/95 backdrop-blur-md space-y-2 sm:space-y-2.5 shrink-0">
                                            <button
                                                type="button"
                                                onClick={handleSendWhatsApp}
                                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full font-serif font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#25D366]/25 active:scale-[0.98] transition-all duration-75 cursor-pointer"
                                            >
                                                <FaWhatsapp className="text-lg" />
                                                <span>ENVIAR PEDIDO POR WHATSAPP</span>
                                            </button>

                                            <p className="font-serif text-[10px] sm:text-xs text-center text-bocadillo-copper/80 font-medium leading-tight">
                                                Coordinamos el pago y confirmación final directamente por chat ♡
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                </div>
            </motion.div>
        </div>
    );
}
