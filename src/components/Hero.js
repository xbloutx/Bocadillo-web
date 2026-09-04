import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-bocadillo-antique overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 min-h-[70vh] py-12 lg:py-8">

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left py-8 lg:py-16">
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src="/images/logo-icons.png"
                            alt="Producto Bocadillo"
                            width={710}
                            height={180}
                            style={{ width: "440px", height: "auto" }}
                            priority
                        />               
                        
                        <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-8xl text-bocadillo-walnut leading-none tracking-[-0.03em] mt-1">
                            BOCADILLO
                        </h1>
                        
                        <p className="font-script text-5xl text-bocadillo-walnut mt-1">
                            — 100% casero —
                        </p>
                        
                        <p className="font-script text-4xl text-bocadillo-walnut mt-5">
                            Dulces momentos, hechos en casa ♡
                        </p>
                    
                        <Link
                            href="/catalogo"
                            className="font-serif mt-6 bg-bocadillo-walnut text-bocadillo-antique px-10 py-4 rounded-full font-bold text-base tracking-wider hover:bg-bocadillo-bark active:scale-[0.97] transition-all duration-75 shadow-xl shadow-bocadillo-walnut/20"
                        >
                            VER CATÁLOGO
                        </Link>
                    </div>
                </div>
                
                <div className="relative flex items-center justify-center h-[350px] sm:h-[450px] lg:h-[550px] w-full mt-4 lg:mt-0">
                    <Image
                        src="/images/hero-pastel.png"
                        alt="Producto Bocadillo"
                        fill
                        sizes="(max-width: 768px) 90vw, 600px"
                        className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
                        priority
                    />
                </div>
            </div>            
        </section>
    );
}