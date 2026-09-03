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
        <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-12 mb-10">
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-black/5 py-5 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div 
                            key={index} 
                            className="flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1.5"
                        >
                            <div className="w-12 h-12 rounded-full bg-bocadillo-antique/50 flex items-center justify-center text-bocadillo-walnut mb-3 group-hover:scale-110 group-hover:bg-bocadillo-antique transition-all duration-300 shadow-sm group-hover:shadow-md">
                                <IconComponent className="text-xl" />
                            </div>
                            <span className="font-serif text-sm md:text-base font-bold text-bocadillo-walnut tracking-wide">
                                {item.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}