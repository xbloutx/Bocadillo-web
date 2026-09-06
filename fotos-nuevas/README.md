# Carpeta para Fotos Nuevas — Bocadillo

Coloca aquí las fotos en bruto que quieras agregar a tu catálogo (PNG, JPG o JPEG).

Luego corre en tu terminal:
```bash
pnpm optimize
```
o
```bash
python scripts/optimizar.py
```

El script te preguntará en qué carpeta de `public/images/` deseas guardarlas (ej: `box`, `dulces`, `salados`, etc.) y las convertirá automáticamente a formato **WebP ultra liviano** sin perder calidad.
