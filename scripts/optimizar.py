#!/usr/bin/env python3
"""
Script de optimización de imágenes para Bocadillo.
Convierte imágenes pesadas (PNG/JPG) a formato WebP ligero de alta fidelidad,
redimensiona a resolución web óptima y las organiza en la subcarpeta que tú elijas.
"""

import os
import re
import sys
import argparse
from pathlib import Path
from PIL import Image, ImageOps

# Asegurar soporte UTF-8 en consola de Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_DIR = Path(__file__).resolve().parent.parent
INPUT_DIR = BASE_DIR / "fotos-nuevas"
OUTPUT_BASE = BASE_DIR / "public" / "images"

VALID_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"}

def sanitizar_nombre(nombre: str) -> str:
    """Convierte nombres con espacios o caracteres especiales a formato web limpio (kebab-case)."""
    # Quitar extensión
    stem = Path(nombre).stem
    # Minúsculas
    stem = stem.lower()
    # Reemplazar tildes y caracteres comunes
    reemplazos = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "n",
        "catálogo": "catalogo", "catalogo": "catalogo", "bocadillos": "bocadillo"
    }
    for orig, rep in reemplazos.items():
        stem = stem.replace(orig, rep)
    # Reemplazar caracteres no alfanuméricos por guiones
    stem = re.sub(r"[^\w\s-]", "", stem)
    stem = re.sub(r"[\s_]+", "-", stem).strip("-")
    return stem or "imagen"

def optimizar_imagen(origen_path: Path, destino_dir: Path, max_size: int = 1000, calidad: int = 85) -> dict:
    """Procesa una sola imagen y la guarda en formato WebP optimizado."""
    destino_dir.mkdir(parents=True, exist_ok=True)
    nombre_limpio = sanitizar_nombre(origen_path.name)
    destino_path = destino_dir / f"{nombre_limpio}.webp"

    # Evitar sobreescribir si ya existe un archivo con el mismo nombre
    contador = 1
    while destino_path.exists():
        destino_path = destino_dir / f"{nombre_limpio}-{contador}.webp"
        contador += 1

    peso_original = origen_path.stat().st_size

    with Image.open(origen_path) as img:
        # Corregir rotación de fotos tomadas con celular (EXIF Orientation)
        img = ImageOps.exif_transpose(img)

        # Redimensionar si supera el tamaño máximo manteniendo proporción
        if max(img.size) > max_size:
            img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)

        # Guardar en WebP con compresión de alta calidad
        # Si tiene canal alpha (transparencia) se mantiene, si no, se guarda en RGB
        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
            img.save(destino_path, format="WEBP", quality=calidad, method=6)
        else:
            img = img.convert("RGB")
            img.save(destino_path, format="WEBP", quality=calidad, method=6)

    peso_final = destino_path.stat().st_size
    ahorro = ((peso_original - peso_final) / peso_original) * 100 if peso_original > 0 else 0

    return {
        "archivo": destino_path.name,
        "peso_orig_kb": peso_original / 1024,
        "peso_fin_kb": peso_final / 1024,
        "ahorro": ahorro,
        "ruta_relativa": destino_path.relative_to(BASE_DIR / "public")
    }

def main():
    parser = argparse.ArgumentParser(description="Optimizador de imágenes para Bocadillo")
    parser.add_argument("--destino", "-d", type=str, help="Subcarpeta dentro de public/images (ej: box, dulces, salados)")
    parser.add_argument("--origen", "-o", type=str, default=str(INPUT_DIR), help="Carpeta de origen con las fotos")
    parser.add_argument("--max-size", "-s", type=int, default=1000, help="Dimensión máxima en píxeles (default: 1000)")
    parser.add_argument("--calidad", "-q", type=int, default=85, help="Calidad WebP de 1 a 100 (default: 85)")

    args = parser.parse_args()

    origen_dir = Path(args.origen)
    origen_dir.mkdir(parents=True, exist_ok=True)

    # Buscar imágenes en la carpeta de origen
    fotos = [f for f in origen_dir.iterdir() if f.is_file() and f.suffix.lower() in VALID_EXTENSIONS]

    if not fotos:
        print("\n" + "=" * 60)
        print("  📷 OPTIMIZADOR DE IMÁGENES — BOCADILLO")
        print("=" * 60)
        print(f"\n⚠️ No se encontraron imágenes en: {origen_dir}")
        print(f"\n👉 Coloca tus fotos nuevas en esa carpeta y vuelve a ejecutar:")
        print("   pnpm optimize   (o python scripts/optimizar.py)\n")
        return

    print("\n" + "=" * 60)
    print(f"  📷 OPTIMIZADOR DE IMÁGENES — {len(fotos)} FOTO(S) DETECTADA(S)")
    print("=" * 60)

    # Si no se especificó destino por argumento, preguntar interactivamente
    destino_nombre = args.destino
    if not destino_nombre:
        # Detectar subcarpetas existentes en public/images para sugerir
        carpetas_existentes = [d.name for d in OUTPUT_BASE.iterdir() if d.is_dir() and not d.name.startswith(".")]
        print("\n¿En qué carpeta de 'public/images/' deseas guardarlas?")
        for i, c in enumerate(carpetas_existentes, 1):
            print(f"  [{i}] {c}")
        print(f"  [{len(carpetas_existentes) + 1}] Otra (crear nueva carpeta)")

        try:
            opcion = input("\nElige un número o escribe el nombre de la carpeta: ").strip()
            if opcion.isdigit():
                num = int(opcion)
                if 1 <= num <= len(carpetas_existentes):
                    destino_nombre = carpetas_existentes[num - 1]
                else:
                    destino_nombre = input("Escribe el nombre de la nueva carpeta: ").strip()
            else:
                destino_nombre = opcion
        except (KeyboardInterrupt, EOFError):
            print("\nOperación cancelada.")
            return

    if not destino_nombre:
        destino_nombre = "general"

    destino_dir = OUTPUT_BASE / destino_nombre
    print(f"\n📁 Carpeta de destino: public/images/{destino_nombre}/")
    print(f"⚙️ Configuración: WebP al {args.calidad}% de calidad | Máximo {args.max_size}px\n")

    # Procesar
    resultados = []
    for f in fotos:
        res = optimizar_imagen(f, destino_dir, max_size=args.max_size, calidad=args.calidad)
        resultados.append(res)
        print(f"  ✓ {res['archivo']:<28} {res['peso_orig_kb']:>6.1f} KB → {res['peso_fin_kb']:>5.1f} KB  ({res['ahorro']:>4.1f}% menos)")

    print("\n" + "-" * 60)
    total_orig = sum(r["peso_orig_kb"] for r in resultados)
    total_fin = sum(r["peso_fin_kb"] for r in resultados)
    ahorro_total = ((total_orig - total_fin) / total_orig) * 100 if total_orig > 0 else 0
    print(f"✨ ¡Listo! {len(resultados)} imágenes optimizadas con éxito.")
    print(f"📊 Peso total: {total_orig / 1024:.2f} MB → {total_fin / 1024:.2f} MB (Ahorraste {ahorro_total:.1f}% de datos)")
    print(f"\nRuta para usar en tu código:")
    for r in resultados:
        print(f"   '/{r['ruta_relativa'].as_posix()}'")
    print("\n" + "=" * 60 + "\n")

if __name__ == "__main__":
    main()
