import PageHeader from "@/components/PageHeader";
import { FaWhatsapp, FaInstagram, FaGlobe, FaPhone } from "react-icons/fa6";

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
    },
    {
        icon: FaInstagram,
        label: "Instagram",
        value: "@bocadillope",
        href: "https://instagram.com/bocadillope",
    },
    {
        icon: FaPhone,
        label: "Llamadas",
        value: "987 738 624",
        href: "tel:+51987738624",
    },
    {
        icon: FaGlobe,
        label: "Web",
        value: "bocadillo.pe",
        href: "https://bocadillo.pe",
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
                                className="group flex items-center gap-4 bg-paper rounded-2xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgb(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300 px-6 py-5"
                            >
                                <span className="w-11 h-11 shrink-0 rounded-full bg-bocadillo-antique/60 flex items-center justify-center text-bocadillo-walnut group-hover:bg-bocadillo-antique transition-colors duration-300">
                                    <Icon className="text-lg" />
                                </span>
                                <span className="text-left">
                                    <span className="block font-serif text-xs uppercase tracking-wider text-bocadillo-hazelnut">
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
                <p className="font-serif text-sm sm:text-base text-bocadillo-hazelnut leading-relaxed max-w-lg mx-auto">
                    ¿Delivery o recojo? Coordinamos el punto o la zona de entrega directo por
                    WhatsApp, según lo que te quede más cómodo.
                </p>
            </div>
        </main>
    );
}
