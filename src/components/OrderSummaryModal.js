"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { useOrder } from "@/context/OrderContext";

const WHATSAPP_NUMBER = "51902733258";

export default function OrderSummaryModal() {
    const {
        items,
        totalProductsCount,
        totalPrice,
        updateQuantity,
        removeItem,
        clearOrder,
        isOrderModalOpen,
        closeOrderModal,
    } = useOrder();

    const [step, setStep] = useState("cart"); // "cart" | "checkout"
    const [direction, setDirection] = useState(1);

    // Reiniciar al paso del carrito cuando se abre el modal
    useEffect(() => {
        if (isOrderModalOpen) {
            setStep("cart");
            setDirection(1);
        }
    }, [isOrderModalOpen]);

    // Bloquear scroll de fondo cuando el modal esté abierto
    useEffect(() => {
        if (isOrderModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOrderModalOpen]);

    // Cerrar con Escape
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") {
                if (step === "checkout") {
                    setDirection(-1);
                    setStep("cart");
                } else {
                    closeOrderModal();
                }
            }
        },
        [step, closeOrderModal]
    );

    useEffect(() => {
        if (isOrderModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOrderModalOpen, handleKeyDown]);

    // Datos del cliente con auto-guardado en localStorage (comparte datos con el modal individual)
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

    const goToCheckout = () => {
        setDirection(1);
        setStep("checkout");
    };

    const goToCart = () => {
        setDirection(-1);
        setStep("cart");
    };

    // Despacho del pedido consolidado a WhatsApp
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

        // Construir lista estructurada de productos para WhatsApp
        const productLines = items
            .map((item) => {
                const itemTotal = (item.price * item.quantity).toFixed(2);
                if (item.packOptions && item.packOptions.length > 0) {
                    return `• *Caja de ${item.quantity} unid:* ${item.name} — S/ ${itemTotal}`;
                }
                return `• *${item.quantity}x* ${item.name} — S/ ${itemTotal}`;
            })
            .join("\n");

        const clientName = formData.fullName.trim();
        const referenceText = formData.reference.trim() ? formData.reference.trim() : "Ninguna";
        const commentLine = formData.note && formData.note.trim() ? `\n• *Comentario:* ${formData.note.trim()}` : "";

        const text = `¡Hola Bocadillo! ♡ Quisiera realizar este pedido surtido de mi catálogo:

🛍️ *RESUMEN DEL PEDIDO:*
${productLines}
───────────────────────────────
💰 *Total estimado:* S/ ${totalPrice} (${totalProductsCount} ${totalProductsCount === 1 ? "ítem" : "ítems"})

📍 *DATOS DE ENTREGA:*
• *Cliente:* ${clientName}
• *Fecha de entrega:* ${formData.deliveryDate}
• *Hora aproximada:* ${formData.deliveryTime}
• *Dirección y Distrito:* ${formData.addressDistrict.trim()}
• *Referencia:* ${referenceText}${commentLine}

¿Me confirman disponibilidad para coordinar el pago y la entrega? ¡Muchas gracias! ♡`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
        closeOrderModal();
    };

    return (
        <AnimatePresence>
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop oscurecido al 80% */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeOrderModal}
                        className="fixed inset-0 bg-black/80 will-change-[opacity]"
                    />

                    {/* Contenedor del Modal / Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%", opacity: 0.8 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.85 }}
                        className="relative w-full max-w-xl bg-paper rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[85vh] z-10 border border-black/5"
                    >
                        {/* Cabecera del Modal */}
                        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-black/5 flex items-center justify-between bg-paper/90 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-2.5">
                                {step === "checkout" ? (
                                    <button
                                        type="button"
                                        onClick={goToCart}
                                        aria-label="Volver a la lista de productos"
                                        className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-bocadillo-walnut active:scale-90 transition-all cursor-pointer mr-1"
                                    >
                                        <FaChevronLeft className="text-xs" />
                                    </button>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-bocadillo-antique/60 flex items-center justify-center text-bocadillo-walnut">
                                        <FiShoppingBag className="text-sm" />
                                    </div>
                                )}
                                <div>
                                    <h2 className="font-serif font-black text-sm sm:text-base text-bocadillo-walnut tracking-tight leading-tight">
                                        {step === "cart" ? "TU PEDIDO" : "DATOS DE ENTREGA"}
                                    </h2>
                                    <p className="font-serif text-[11px] text-bocadillo-copper font-medium leading-tight">
                                        {step === "cart"
                                            ? `${totalProductsCount} ${totalProductsCount === 1 ? "producto seleccionado" : "productos seleccionados"}`
                                            : "Paso 2: Coordina el envío directo por WhatsApp"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeOrderModal}
                                aria-label="Cerrar pedido"
                                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-bocadillo-walnut active:scale-90 transition-all cursor-pointer shrink-0"
                            >
                                <FaXmark className="text-sm" />
                            </button>
                        </div>

                        {/* Contenido Principal con Pasos */}
                        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
                            {step === "cart" ? (
                                <div className="p-4 sm:p-6 space-y-4">
                                    {items.length === 0 ? (
                                        /* Estado Vacío */
                                        <div className="text-center py-10 px-4 space-y-3">
                                            <div className="w-14 h-14 rounded-full bg-bocadillo-antique/40 text-bocadillo-copper flex items-center justify-center mx-auto mb-2">
                                                <FiShoppingBag className="text-2xl" />
                                            </div>
                                            <h3 className="font-serif font-bold text-base text-bocadillo-walnut">
                                                Tu pedido está vacío
                                            </h3>
                                            <p className="text-xs text-bocadillo-walnut/70 max-w-xs mx-auto">
                                                Explora nuestro catálogo y agrega tus combos o bocaditos favoritos para armar tu pedido.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={closeOrderModal}
                                                className="mt-2 inline-flex items-center gap-1.5 bg-bocadillo-walnut text-[#F6E9D9] px-5 py-2 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-bocadillo-bark active:scale-95 transition-all"
                                            >
                                                Explorar Catálogo
                                            </button>
                                        </div>
                                    ) : (
                                        /* Lista de Productos */
                                        <div className="space-y-3">
                                            {items.map((item) => {
                                                const hasPacks = Boolean(item.packOptions && item.packOptions.length > 0);
                                                const currentPackIndex = hasPacks ? item.packOptions.indexOf(item.quantity) : -1;
                                                const canDecrease = hasPacks ? currentPackIndex > 0 : item.quantity > 1;
                                                const canIncrease = hasPacks ? currentPackIndex < item.packOptions.length - 1 : item.quantity < 999;

                                                const handleDecrease = () => {
                                                    if (hasPacks) {
                                                        if (currentPackIndex > 0) {
                                                            updateQuantity(item.key, item.packOptions[currentPackIndex - 1]);
                                                        }
                                                    } else {
                                                        if (item.quantity > 1) {
                                                            updateQuantity(item.key, item.quantity - 1);
                                                        }
                                                    }
                                                };

                                                const handleIncrease = () => {
                                                    if (hasPacks) {
                                                        if (currentPackIndex < item.packOptions.length - 1) {
                                                            updateQuantity(item.key, item.packOptions[currentPackIndex + 1]);
                                                        }
                                                    } else {
                                                        updateQuantity(item.key, item.quantity + 1);
                                                    }
                                                };

                                                return (
                                                    <div
                                                        key={item.key}
                                                        className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-black/[0.06] shadow-2xs hover:shadow-xs transition-shadow"
                                                    >
                                                        {/* Miniatura de la Foto */}
                                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF7F4] shrink-0 border border-black/5">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                sizes="64px"
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        {/* Detalles: Nombre, precio unitario y presentación/pack */}
                                                        <div className="flex-1 min-w-0 space-y-1">
                                                            <h4 className="font-serif font-bold text-xs sm:text-sm text-bocadillo-walnut leading-snug line-clamp-2">
                                                                {item.name}
                                                            </h4>
                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                <span className="text-[11px] text-bocadillo-copper font-medium">
                                                                    S/ {item.price.toFixed(2)} c/u
                                                                </span>
                                                                {hasPacks && (
                                                                    <span className="text-[10px] bg-bocadillo-antique/80 border border-bocadillo-copper/20 text-bocadillo-walnut px-2 py-0.5 rounded-full font-bold">
                                                                        Caja de {item.quantity} unid
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Controles de Cantidad + Eliminar */}
                                                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                            <span className="font-serif font-black text-xs sm:text-sm text-bocadillo-walnut">
                                                                S/ {(item.price * item.quantity).toFixed(2)}
                                                            </span>

                                                            <div className="flex items-center gap-1 bg-bocadillo-antique/50 rounded-full p-0.5 border border-bocadillo-copper/20">
                                                                <button
                                                                    type="button"
                                                                    disabled={!canDecrease}
                                                                    onClick={handleDecrease}
                                                                    aria-label="Disminuir cantidad"
                                                                    className="w-6 h-6 rounded-full bg-white text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:active:scale-100 transition-all text-xs cursor-pointer"
                                                                >
                                                                    <FiMinus className="text-[10px]" />
                                                                </button>
                                                                <span className="min-w-[28px] px-1 text-center font-serif font-bold text-xs text-bocadillo-walnut">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    disabled={!canIncrease}
                                                                    onClick={handleIncrease}
                                                                    aria-label="Aumentar cantidad"
                                                                    className="w-6 h-6 rounded-full bg-white text-bocadillo-walnut flex items-center justify-center hover:bg-bocadillo-antique active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:active:scale-100 transition-all text-xs cursor-pointer"
                                                                >
                                                                    <FiPlus className="text-[10px]" />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeItem(item.key)}
                                                                    aria-label="Eliminar producto"
                                                                    className="w-6 h-6 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center active:scale-90 transition-all ml-0.5 cursor-pointer"
                                                                >
                                                                    <FiTrash2 className="text-[10px]" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Resumen de Total */}
                                            <div className="p-3.5 bg-bocadillo-antique/35 rounded-2xl border border-bocadillo-copper/20 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-serif text-xs text-bocadillo-copper font-medium">
                                                        Total Estimado ({totalProductsCount} {totalProductsCount === 1 ? "ítem" : "ítems"}):
                                                    </span>
                                                    <span className="font-serif text-base sm:text-lg font-black text-bocadillo-walnut">
                                                        S/ {totalPrice}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-bocadillo-copper/80 leading-relaxed font-serif">
                                                    * Los costos de delivery o punto de entrega se coordinan de forma personalizada por WhatsApp.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Paso 2: Formulario de Entrega */
                                <div className="p-4 sm:p-6 space-y-3.5">
                                    <div className="p-3 bg-bocadillo-antique/40 rounded-2xl border border-bocadillo-copper/20 flex items-center justify-between text-xs font-serif">
                                        <span className="text-bocadillo-copper font-medium">
                                            Productos: <strong>{totalProductsCount} ítems</strong>
                                        </span>
                                        <span className="text-bocadillo-walnut font-black text-sm">
                                            Total: S/ {totalPrice}
                                        </span>
                                    </div>

                                    <form onSubmit={handleSendWhatsApp} className="space-y-3">
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

                                        {/* Fecha y Hora de Entrega */}
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

                                        {/* Dirección y Distrito */}
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

                                        {/* Comentario */}
                                        <div>
                                            <label className="font-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bocadillo-bark block mb-1">
                                                Comentario (Opcional)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.note}
                                                onChange={(e) => handleInputChange("note", e.target.value)}
                                                placeholder="Ej: Para cumpleaños infantil, dedicatoria especial"
                                                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-bocadillo-copper/25 text-base sm:text-sm text-bocadillo-walnut placeholder:text-bocadillo-walnut/35 focus:outline-none focus:border-bocadillo-copper focus:ring-1 focus:ring-bocadillo-copper transition-all"
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Barra de Acciones Inferior */}
                        <div className="p-3 sm:p-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] border-t border-black/5 bg-paper/95 backdrop-blur-md space-y-2 shrink-0">
                            {step === "cart" ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={goToCheckout}
                                        disabled={items.length === 0}
                                        className="group w-full flex items-center justify-center gap-2 bg-bocadillo-walnut hover:bg-bocadillo-bark text-[#F6E9D9] py-3 sm:py-3.5 px-4 rounded-full font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-bocadillo-walnut/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <span>CONTINUAR CON DATOS DE ENTREGA</span>
                                        <FaChevronRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={closeOrderModal}
                                        className="w-full text-center font-serif text-xs text-bocadillo-copper hover:text-bocadillo-bark py-1 font-medium cursor-pointer transition-colors"
                                    >
                                        + Seguir agregando más productos del catálogo
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleSendWhatsApp}
                                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 sm:py-3.5 px-4 rounded-full font-serif font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#25D366]/25 active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <FaWhatsapp className="text-lg" />
                                        <span>ENVIAR PEDIDO COMPLETO POR WHATSAPP</span>
                                    </button>
                                    <p className="font-serif text-[10px] text-center text-bocadillo-copper font-medium">
                                        Coordinamos el pago y confirmación final directamente por chat ♡
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
