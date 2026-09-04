export default function PageHeader({ title, subtitle }) {
    return (
        <div className="bg-bocadillo-antique px-6 pt-16 pb-20 sm:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="font-serif font-black text-4xl sm:text-5xl text-foreground tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="font-script text-2xl sm:text-3xl text-bocadillo-hazelnut mt-2">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
