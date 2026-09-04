# Bocadillo — Catálogo Web

Catálogo interactivo para **Bocadillo**, negocio casero peruano especializado en combos de sandwich + postre + bebida. Los pedidos y entregas se coordinan directamente a través de WhatsApp e Instagram.

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **UI & Estilos:** React 19, Tailwind CSS v4
- **Animaciones & Iconos:** Framer Motion, React Icons
- **Gestor de paquetes:** `pnpm`

## Documentación del Proyecto

- [CONTEXT.md](./CONTEXT.md): Modelo de negocio, conceptos clave (*Combos*, no productos sueltos) y glosario del dominio.
- [AGENTS.md](./AGENTS.md): Reglas de desarrollo, convenciones y pautas para agentes de IA y colaboradores.

## Puesta en Marcha

Instala las dependencias y corre el servidor localmente con **`pnpm`**:

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Ejecutar el linter
pnpm lint
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

