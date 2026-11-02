export default function FlipCard({
    card,
    isFlipped,
    onClick,
}) {
    const { id, title, theme, points, Icon, gradient } = card;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`${isFlipped ? "Tutup" : "Buka"} ${title}`}
            aria-pressed={isFlipped}
            className="group cursor-pointer w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
        >
            <div className="flip-container h-72 sm:h-80">
                <div
                    className={`flip-inner relative h-full w-full ${isFlipped ? "is-flipped" : ""
                        }`}
                >
                    {/* Bagian depan kartu */}
                    <div className="flip-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-4 border-emerald-900 bg-white shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                        {/* Pita atas: nomor kartu */}
                        <div
                            className={`flex h-14 shrink-0 items-center justify-between bg-gradient-to-r ${gradient} px-4 text-white`}
                        >
                            <span className="text-xl font-black tracking-wider sm:text-2xl">
                                KARTU {String(id).padStart(2, "0")}
                            </span>
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-8 w-8 text-white"
                                fill="currentColor"
                            >
                                <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
                            </svg>
                        </div>

                        {/* Isi: ikon dan judul */}
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
                            <div
                                className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-lg ring-4 ring-emerald-100 sm:h-24 sm:w-24`}
                            >
                                <Icon className="h-12 w-12 text-white sm:h-14 sm:w-14" />
                            </div>

                            <h3 className="text-3xl font-black leading-tight tracking-tight text-emerald-950 sm:text-4xl">
                                {title}
                            </h3>
                        </div>

                        {/* Pita bawah */}
                        <div className="shrink-0 bg-emerald-900 px-4 py-3 text-center text-white">
                            <p className="text-lg font-extrabold tracking-wide sm:text-xl">
                                KLIK UNTUK MEMBUKA
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-emerald-200">
                                Cerdas Cermat Dinas Kesehatan
                            </p>
                        </div>
                    </div>

                    {/* Bagian belakang kartu */}
                    <div className="flip-face flip-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-4 border-emerald-900 bg-white shadow-xl">
                        {/* Pita atas */}
                        <div
                            className={`flex h-12 shrink-0 items-center justify-center bg-gradient-to-r ${gradient} px-4 text-white`}
                        >
                            <span className="text-lg font-black uppercase tracking-widest sm:text-xl">
                                Tema Pertanyaan
                            </span>
                        </div>

                        {/* Isi: tema dan poin */}
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
                            <h3 className="max-w-full text-2xl font-black leading-tight text-emerald-950 sm:text-3xl">
                                {theme}
                            </h3>

                            <div className="rounded-2xl bg-emerald-900 px-8 py-2 shadow-lg">
                                <p className="text-6xl font-black leading-none tabular-nums text-amber-300 sm:text-7xl">
                                    {points}
                                </p>
                                <p className="mt-1 text-lg font-extrabold uppercase tracking-[0.3em] text-white">
                                    Poin
                                </p>
                            </div>
                        </div>

                        {/* Pita bawah */}
                        <div className="shrink-0 bg-emerald-900 px-4 py-2 text-center text-sm font-bold text-emerald-100 sm:text-base">
                            Kartu {id} · Dinas Kesehatan RI
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}