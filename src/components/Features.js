import { FiHeart, FiFeather, FiPackage, FiTruck } from "react-icons/fi";

export default function Features() {
    const items = [
        { 
            icon: FiHeart, 
            text: "100% Casero" 
        },
        { 
            icon: FiFeather, 
            text: "Ingredientes de calidad" 
        },
        { 
            icon: FiPackage, 
            text: "Pedidos personalizados" 
        },
        { 
            icon: FiTruck, 
            text: "Entrega con cuidado" 
        },
    ];

    return (
        <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 lg:-mt-16 mb-8 sm:mb-12">
            <div className="bg-white/80 backdrop-blur-xl saturate-[180%] rounded-2xl sm:rounded-3xl shadow-xl shadow-bocadillo-walnut/5 border border-white/60 py-3.5 px-4 sm:py-6 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6">
                {items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div 
                            key={index} 
                            className="flex items-center sm:flex-col sm:justify-center gap-2.5 sm:gap-3 p-1.5 sm:p-0 rounded-xl group cursor-pointer active:scale-[0.97] transition-all duration-100 ease-out hover:-translate-y-0.5"
                        >
                            <div className="w-9 h-9 sm:w-12 sm:h-12 shrink-0 rounded-full bg-bocadillo-antique/70 flex items-center justify-center text-bocadillo-walnut sm:mb-1 group-hover:scale-110 group-hover:bg-bocadillo-copper group-hover:text-white transition-all duration-200 shadow-sm">
                                <IconComponent className="text-base sm:text-xl" />
                            </div>
                            <span className="font-serif text-[11px] sm:text-xs md:text-sm font-bold text-bocadillo-walnut tracking-tight text-left sm:text-center leading-tight">
                                {item.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

