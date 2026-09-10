import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative bg-[#F3E3D2] overflow-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-center max-w-[1700px] mx-auto px-5 sm:px-10 lg:px-16 pt-3 pb-16 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24">

                {/* Bloque de Marca y Logo (En móvil: 1° Arriba | En desktop: Columna izquierda lg:col-span-5) */}
                <div className="w-full lg:col-span-5 flex flex-col items-center justify-center text-center pt-1 pb-1 sm:py-6 lg:py-12 z-10">
                    <div className="flex flex-col items-center text-center max-w-[480px]">
                        <Image
                            src="/images/logo-icons.webp"
                            alt="Ilustración artesanal de pan, cupcake y bebida Bocadillo"
                            width={500}
                            height={120}
                            className="w-[120px] sm:w-[180px] lg:w-[270px] h-auto mb-1 sm:mb-2 object-contain"
                            priority
                        />               
                        
                        <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-7xl xl:text-8xl text-bocadillo-walnut leading-none tracking-tight">
                            BOCADILLO
                        </h1>
                        
                        <p className="font-serif italic font-medium text-sm sm:text-xl lg:text-3xl text-bocadillo-bark mt-1 sm:mt-2 tracking-wide">
                            — 100% casero —
                        </p>
                        
                        <p className="font-script text-lg sm:text-2xl lg:text-4xl xl:text-5xl text-bocadillo-walnut mt-1 sm:mt-3 leading-snug">
                            Dulces momentos, hechos en casa ♡
                        </p>
                    
                        {/* Botón CTA en Desktop (dentro de la columna de marca) */}
                        <Link
                            href="/catalogo"
                            className="hidden lg:inline-flex items-center justify-center font-serif mt-7 bg-bocadillo-walnut text-[#F6E9D9] px-10 py-4 rounded-full font-bold text-base tracking-widest uppercase hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-100 ease-out shadow-lg shadow-bocadillo-walnut/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bocadillo-copper min-h-[44px]"
                        >
                            VER CATÁLOGO
                        </Link>
                    </div>
                </div>
                
                {/* Bodegón de Productos / Banner (En móvil: 2° Centro | En desktop: Columna derecha lg:col-span-7) */}
                <div className="w-full lg:col-span-7 relative flex items-center justify-center mt-2 sm:mt-4 lg:mt-0">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-w-[900px] lg:max-w-none">
                        <Image
                            src="/images/banner.webp"
                            alt="Banquete de productos artesanales Bocadillo recién horneados"
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-contain object-center drop-shadow-sm"
                            priority
                        />
                    </div>
                </div>

                {/* Botón CTA en Móvil (En móvil: 3° Abajo del banner | En desktop: oculto) */}
                <div className="w-full flex justify-center mt-3 sm:mt-5 lg:hidden z-10">
                    <Link
                        href="/catalogo"
                        className="inline-flex items-center justify-center font-serif bg-bocadillo-walnut text-[#F6E9D9] px-8 sm:px-10 py-2.5 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-100 ease-out shadow-lg shadow-bocadillo-walnut/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bocadillo-copper min-h-[44px]"
                    >
                        VER CATÁLOGO
                    </Link>
                </div>
            </div>            
        </section>
    );
}
