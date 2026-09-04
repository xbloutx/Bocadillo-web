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
        <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-10 mb-12">
            <div className="bg-white/75 backdrop-blur-xl saturate-[180%] rounded-3xl shadow-xl shadow-bocadillo-walnut/5 border border-white/60 py-6 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div 
                            key={index} 
                            className="flex flex-col items-center justify-center group cursor-pointer active:scale-95 transition-all duration-75 ease-out hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-bocadillo-antique/60 flex items-center justify-center text-bocadillo-walnut mb-3 group-hover:scale-110 group-hover:bg-bocadillo-copper group-hover:text-white transition-all duration-200 shadow-sm">
                                <IconComponent className="text-xl" />
                            </div>
                            <span className="font-serif text-xs md:text-sm font-bold text-bocadillo-walnut tracking-tight">
                                {item.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}