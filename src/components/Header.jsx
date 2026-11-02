export default function Header() {
    return (
        <header className="mb-10 text-center">
            <p className="font-mono mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-400 ">
                Kementerian Kesehatan RI
            </p>

            <h1 className="font-mono text-3xl font-black tracking-tight text-white sm:text-5xl">
                Cerdas Cermat{" "}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Dinas Kesehatan
                </span>
            </h1>

            <p className="mt-3 text-sm text-slate-400">
                Pilih kartu untuk melihat tema dan bobot pertanyaan.
            </p>
        </header>
    );
}