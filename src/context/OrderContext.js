"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { products } from "@/data/products";

const OrderContext = createContext(null);

const STORAGE_KEY = "bocadillo_order_items";

// Función para sanitizar ítems de localStorage y asegurar que los productos limitados a packs cumplan sus reglas
const sanitizeItems = (rawItems) => {
    if (!Array.isArray(rawItems)) return [];
    return rawItems.map((item) => {
        const productDef = products.find((p) => p.id === item.id);
        const packOptions = productDef?.packOptions || item.packOptions || null;
        let qty = Number(item.quantity) || 1;

        if (packOptions && packOptions.length > 0) {
            if (!packOptions.includes(qty)) {
                // Ajustar al número de pack válido más cercano
                qty = packOptions.reduce((prev, curr) =>
                    Math.abs(curr - qty) < Math.abs(prev - qty) ? curr : prev
                );
            }
        } else {
            qty = Math.max(1, Math.min(999, Math.round(qty)));
        }

        return {
            ...item,
            quantity: qty,
            packOptions: packOptions,
            packSelected: packOptions ? qty : item.packSelected || null,
        };
    });
};

export function OrderProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Cargar ítems guardados en localStorage al iniciar en el cliente
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setItems(sanitizeItems(parsed));
                }
            }
        } catch (_) {}
        setIsInitialized(true);
    }, []);

    // Sincronizar automáticamente con localStorage cuando cambien los ítems
    useEffect(() => {
        if (!isInitialized) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (_) {}
    }, [items, isInitialized]);

    // Agregar producto al pedido
    const addItem = useCallback((product, quantity = 1, packSelected = null) => {
        const hasPacks = Boolean(product?.packOptions && product.packOptions.length > 0);
        let qty = Number(quantity) > 0 ? Number(quantity) : 1;

        if (hasPacks) {
            if (!product.packOptions.includes(qty)) {
                qty = product.packOptions[0];
            }
        }

        const itemKey = String(product.id);

        setItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.key === itemKey);
            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: qty,
                    packSelected: hasPacks ? qty : null,
                    packOptions: product.packOptions || null,
                };
                return updated;
            }

            return [
                ...prevItems,
                {
                    key: itemKey,
                    id: product.id,
                    name: product.name,
                    shortName: product.shortName || product.name,
                    price: Number(product.price) || 0,
                    quantity: qty,
                    image: (product.images && product.images[0]) || product.image || "/images/producto-1.webp",
                    presentation: product.presentation || "Cajas de cartón",
                    packSelected: hasPacks ? qty : null,
                    packOptions: product.packOptions || null,
                    unitLabel: product.unitLabel || null,
                },
            ];
        });
    }, []);

    // Actualizar cantidad de un ítem existente
    const updateQuantity = useCallback((itemKey, newQuantity) => {
        const qty = Number(newQuantity);
        if (qty <= 0) {
            removeItem(itemKey);
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.key !== itemKey) return item;

                if (item.packOptions && item.packOptions.length > 0) {
                    if (item.packOptions.includes(qty)) {
                        return {
                            ...item,
                            quantity: qty,
                            packSelected: qty,
                        };
                    }
                    // Si no es un valor permitido en packOptions, no aplicar cambio
                    return item;
                }

                return { ...item, quantity: Math.min(qty, 999) };
            })
        );
    }, []);

    // Eliminar un producto del pedido
    const removeItem = useCallback((itemKey) => {
        setItems((prevItems) => prevItems.filter((item) => item.key !== itemKey));
    }, []);

    // Vaciar todo el pedido (por ejemplo, tras enviar el WhatsApp)
    const clearOrder = useCallback(() => {
        setItems([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (_) {}
    }, []);

    const openOrderModal = useCallback(() => setIsOrderModalOpen(true), []);
    const closeOrderModal = useCallback(() => setIsOrderModalOpen(false), []);

    // Totales calculados
    const totalItems = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    const totalProductsCount = items.length;

    const totalPrice = useMemo(() => {
        const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return sum.toFixed(2);
    }, [items]);

    const value = useMemo(
        () => ({
            items,
            totalItems,
            totalProductsCount,
            totalPrice,
            addItem,
            removeItem,
            updateQuantity,
            clearOrder,
            isOrderModalOpen,
            openOrderModal,
            closeOrderModal,
        }),
        [
            items,
            totalItems,
            totalProductsCount,
            totalPrice,
            addItem,
            removeItem,
            updateQuantity,
            clearOrder,
            isOrderModalOpen,
            openOrderModal,
            closeOrderModal,
        ]
    );

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder debe ser utilizado dentro de un OrderProvider");
    }
    return context;
}
