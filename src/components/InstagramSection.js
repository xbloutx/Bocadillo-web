import Image from "next/image";
import { FaInstagram, FaPlay } from "react-icons/fa6";

const INSTAGRAM_POSTS =[
    {
        id: 1,
        image: "/images/instagram/instagram6.webp",
        link: "https://www.instagram.com/p/DZyxvAWDlso/?img_index=1",
        text: "35 loncheritas entregadas para celebración del Día del Padre  ♡",
    },
    {
        id: 2,
        image: "/images/instagram/instagram5.webp",
        link: "https://www.instagram.com/bocadillope/reel/DbyyUUsOTIX/",
        type: "reel",
        text: "Les comparto el proceso de uno de los pedidos que tuvimos por el día del maestro 👩🏻‍🏫",
    },
    {
        id: 3,
        image: "/images/instagram/instagram4.webp",
        link: "https://www.instagram.com/p/DaMjeb9DgEP/?img_index=1",
        text: "Nuestros Pasteles de Acelga ♡",
    },
    {
        id: 4,
        image: "/images/instagram/instagram3.webp",
        link: "https://www.instagram.com/p/DZzATNDus8u/",
        text: "Pequeñas, delicadas y llenas de sabor",
    },
]

export default function InstagramSection() {
    return (
        <section className="relative pt-6 pb-12 sm:pb-20 bg-gradient-to-b from-transparent via-bocadillo-antique/20 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                {/* Cabecera Unificada estilo Apple Design */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-9 gap-4">
                    {/* Izquierda: Avatar Grande con Anillo de Instagram Story + Identidad Destacada */}
                    <div className="flex items-center gap-4 sm:gap-5">
                        {/* Anillo de Instagram Story */}
                        <a 
                            href="https://instagram.com/bocadillope/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full hover:scale-105 transition-transform duration-300 shadow-md shrink-0"
                            aria-label="Ver perfil de Instagram de Bocadillo"
                        >
                            <div className="relative w-[76px] h-[76px] sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden bg-white p-0.5 border-2 border-white shadow-inner">
                                <Image
                                    src="/images/instagram/logo-bocadillo.webp" 
                                    alt="Bocadillo Instagram"
                                    fill
                                    sizes="(max-width: 640px) 76px, (max-width: 768px) 80px, 88px"
                                    className="rounded-full object-cover scale-120 sm:scale-115"
                                />
                            </div>
                        </a>

                        <div>
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <a
                                    href="https://instagram.com/bocadillope/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-serif font-black text-xl sm:text-3xl text-bocadillo-walnut hover:text-bocadillo-copper transition-colors tracking-tight"
                                >
                                    bocadillope
                                </a>
                                <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-bold bg-pink-50 text-pink-600 border border-pink-200/70 shadow-2xs">
                                    <FaInstagram className="mr-1 text-[11px] sm:text-xs" /> Instagram
                                </span>
                            </div>
                            <p className="font-script font-bold text-[15px] sm:text-xl md:text-2xl text-bocadillo-copper mt-0.5 sm:mt-1 leading-snug">
                                Cajas de bocaditos caseros y momentos dulces en Lima ♡
                            </p>
                        </div>
                    </div>

                    {/* Derecha: Botón estilo Boutique (ancho completo en móvil, compacto en desktop) */}
                    <a
                        href="https://instagram.com/bocadillope/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex sm:inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-white hover:bg-pink-50/30 border border-pink-200/80 hover:border-pink-300/90 px-4 sm:pl-2.5 sm:pr-5 py-2 rounded-full shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        {/* Círculo suave con el icono de Instagram */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-50 group-hover:bg-pink-100/80 flex items-center justify-center text-pink-600 transition-colors shrink-0">
                            <FaInstagram className="text-sm sm:text-base" />
                        </div>
                        <span className="font-serif font-bold text-xs sm:text-sm text-bocadillo-walnut group-hover:text-bocadillo-bark">
                            Seguir en Instagram
                        </span>
                    </a>
                </div>
                
                {/* Cuadrícula de fotos estilo Apple Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
                    {INSTAGRAM_POSTS.map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5 border border-black/[0.06] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out"
                        >
                            <Image
                                src={post.image}
                                alt={post.text}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            
                            {/* Badge Glassmorphism para Reels */}
                            {post.type === "reel" && (
                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-white text-[11px] font-medium shadow-xs">
                                    <FaPlay className="text-[9px]" />
                                    <span>Reel</span>
                                </div>
                            )}
                            
                            {/* Overlay degradado cinemático inferior */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                                <p className="text-white text-xs sm:text-sm font-medium leading-snug line-clamp-3">
                                    {post.text}
                                </p>
                            </div>  
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
