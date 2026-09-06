export default function PageHeader({ title, subtitle }) {
    return (
        <div className="bg-bocadillo-antique px-4 pt-8 pb-12 sm:px-8 sm:pt-16 sm:pb-20 border-b border-black/[0.03]">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="font-serif font-black text-2xl sm:text-5xl text-bocadillo-walnut tracking-[-0.02em]">
                    {title}
                </h1>
                {subtitle && (
                    <p className="font-script text-lg sm:text-3xl text-bocadillo-copper mt-1 sm:mt-2">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
