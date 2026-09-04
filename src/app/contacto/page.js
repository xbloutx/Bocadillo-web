import PageHeader from "@/components/PageHeader";
import { FaWhatsapp, FaInstagram, FaTiktok, } from "react-icons/fa6";

export const metadata = {
    title: "Contacto",
    description: "Escríbenos a Bocadillo por WhatsApp, Instagram o llamada. Coordinamos delivery o recojo según tu zona.",
};

const CONTACTS = [
    {
        icon: FaWhatsapp,
        label: "WhatsApp / Pedidos",
        value: "902 733 258",
        href: "https://wa.me/51902733258",
        highlight: true,
    },
    {
        icon: FaWhatsapp,
        label: "Llamadas",
        value: "987 738 624",
        href: "https://wa.me/51987738624",
        highlight: true,
    },
    {
        icon: FaInstagram,
        label: "Instagram",
        value: "@bocadillope",
        href: "https://instagram.com/bocadillope",
    },
    {
        icon: FaTiktok,
        label: "Web Oficial",
        value: "bocadillo.pe",
        href: "https://www.tiktok.com/@bocadillo.pe",
    },
];

export default function ContactoPage() {
    return (
        <main className="bg-background min-h-screen">
            <PageHeader title="CONTACTO" subtitle="Estamos a un mensaje ♡" />

            <div className="max-w-3xl mx-auto px-6 sm:px-8 -mt-8 relative z-10 pb-10">
                <div className="grid sm:grid-cols-2 gap-4">
                    {CONTACTS.map((contact) => {
                        const Icon = contact.icon;
                        return (
                            <a
                                key={contact.label}
                                href={contact.href}
                                target={contact.href.startsWith("http") ? "_blank" : undefined}
                                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group flex items-center gap-4 bg-paper rounded-2xl border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(71,33,13,0.08)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-75 px-6 py-5 cursor-pointer"
                            >
                                <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                    contact.highlight 
                                        ? "bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white" 
                                        : "bg-bocadillo-antique/60 text-bocadillo-walnut group-hover:bg-bocadillo-copper group-hover:text-white"
                                }`}>
                                    <Icon className="text-xl" />
                                </span>
                                <span className="text-left">
                                    <span className="block font-serif text-xs uppercase tracking-wider text-bocadillo-copper font-bold">
                                        {contact.label}
                                    </span>
                                    <span className="block font-serif text-base font-bold text-bocadillo-walnut">
                                        {contact.value}
                                    </span>
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-20 text-center">
                <div className="bg-bocadillo-antique/30 rounded-2xl p-6 border border-black/5 max-w-xl mx-auto">
                    <p className="font-serif text-sm sm:text-base text-bocadillo-walnut font-medium leading-relaxed">
                        ¿Delivery o recojo? Coordinamos el punto o la zona de entrega directo por
                        WhatsApp, según lo que te quede más cómodo.
                    </p>
                </div>
            </div>
        </main>
    );
}
