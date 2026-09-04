<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bocadillo — Guía de Desarrollo para Agentes

## 1. Gestor de Paquetes (Regla Estricta)
* **Usa siempre `pnpm`** para todos los comandos, scripts e instalación de dependencias:
  * Iniciar servidor de desarrollo: `pnpm dev`
  * Construir para producción: `pnpm build`
  * Ejecutar linter: `pnpm lint`
  * Agregar dependencias: `pnpm add <paquete>` / `pnpm add -D <paquete>`
* **No usar `npm` ni `yarn`**.

## 2. Contexto de Negocio y Vocabulario (Obligatorio)
* **Lee siempre [CONTEXT.md](./CONTEXT.md) antes de crear o modificar componentes, textos o lógica.**
* La unidad de venta es el **Combo** (compuesto por salado + dulce + bebida). *Evitar referirse a ellos como "productos sueltos" de cara al usuario.*
* El sitio es un **catálogo interactivo** que canaliza los pedidos hacia WhatsApp e Instagram. No implementar pasarelas de pago, carritos complejos ni bases de datos transaccionales a menos que se solicite explícitamente.
* Precios, delivery y puntos de recojo se coordinan de forma personalizada por WhatsApp.

## 3. Stack Tecnológico
* **Framework:** Next.js 16 (App Router en `src/app`).
* **UI & Estilos:** React 19, Tailwind CSS v4 (`@tailwindcss/postcss`).
* **Animaciones & Iconos:** Framer Motion (`framer-motion`), React Icons (`react-icons`).
* **Estructura de Carpetas:**
  * `src/app/`: Rutas, layouts y páginas principales.
  * `src/components/`: Componentes modulares y reutilizables de UI.
  * `src/data/products.js`: Fuente de datos estática para el catálogo de combos.
  * `public/`: Imágenes y activos estáticos.

## 4. Estilo y Buenas Prácticas
* **Mobile-First:** El tráfico principal proviene de redes sociales (Instagram/TikTok); la experiencia móvil debe ser prioritaria.
* **Componentes de Servidor vs. Cliente:** Mantener componentes como Server Components por defecto; usar `'use client'` únicamente cuando se requiera interactividad, estado o hooks de cliente / animaciones con Framer Motion.
* **Animaciones & UI Craft:** Se encuentran instaladas globalmente las skills de diseño e interacción de Emil Kowalski (`animate`, `emil-design-eng`, `apple-design`, `review-animations`, etc.) para guiar el refinamiento de microinteracciones, curvas y transiciones fluidas.

## 5. Mantenimiento Continuo de Documentación (.md) (Regla Obligatoria)
* En cada sesión de trabajo o cambio relevante, **actualizar activamente los archivos `.md`** ([CONTEXT.md](./CONTEXT.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md)):
  * Si cambian entidades, reglas de negocio o flujos comerciales: actualizar `CONTEXT.md`.
  * Si se introducen nuevas herramientas, comandos, reglas técnicas o convenciones: actualizar `AGENTS.md`.
  * Si cambia la instalación, scripts o presentación general del proyecto: mantener al día `README.md`.

