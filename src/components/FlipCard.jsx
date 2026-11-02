// Semua class ditulis lengkap supaya pasti dibuat Tailwind.
const PALETTES = [
    { front: "from-emerald-500 to-emerald-700", back: "from-emerald-700 to-emerald-900", icon: "text-emerald-700" },
    { front: "from-sky-500 to-blue-700", back: "from-blue-700 to-blue-900", icon: "text-blue-700" },
    { front: "from-rose-500 to-red-700", back: "from-red-700 to-red-900", icon: "text-red-700" },
    { front: "from-orange-500 to-orange-700", back: "from-orange-700 to-orange-900", icon: "text-orange-700" },
    { front: "from-violet-500 to-purple-700", back: "from-purple-700 to-purple-900", icon: "text-purple-700" },
    { front: "from-teal-500 to-cyan-700", back: "from-cyan-700 to-cyan-900", icon: "text-cyan-700" },
    { front: "from-pink-500 to-fuchsia-700", back: "from-fuchsia-700 to-fuchsia-900", icon: "text-fuchsia-700" },
    { front: "from-indigo-500 to-indigo-700", back: "from-indigo-700 to-indigo-900", icon: "text-indigo-700" },
    { front: "from-lime-600 to-green-700", back: "from-green-700 to-green-900", icon: "text-green-700" },
];

const textShadow = { textShadow: "0 2px 4px rgba(0,0,0,0.45)" };

function CrossMark({ className = "" }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
        </svg>
    );
}

function HeartbeatLine({ className = "" }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 120 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M0 12h30l6-9 8 18 7-13 5 4h34" />
        </svg>
    );
}
const WEIGHT_STYLES = {
    150: { back: "from-red-600 to-red-900" },
    100: { back: "from-blue-600 to-blue-900" },
    50: { back: "from-green-600 to-green-900" },
};
const DEFAULT_WEIGHT_STYLE = { back: "from-slate-600 to-slate-900" };

export default function FlipCard({ card, isFlipped, onClick, compact = false }) {
    const { id, title, theme, points, Icon } = card;
    const number = String(id).padStart(2, "0");
    const weight = WEIGHT_STYLES[Number(points)] ?? DEFAULT_WEIGHT_STYLE;

    // Warna berdasarkan nomor kartu (aman walau id bukan angka)
    const n = Number(id);
    const palette = PALETTES[Number.isFinite(n) ? Math.abs(n - 1) % PALETTES.length : 0];

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`${isFlipped ? "Tutup" : "Buka"} ${title}`}
            aria-pressed={isFlipped}
            className={`group w-full cursor-pointer rounded-2xl text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${compact ? "h-full" : ""
                }`}
        >
            <div className={`flip-container ${compact ? "h-full" : "h-72 sm:h-80"}`}>
                <div className={`flip-inner relative h-full w-full ${isFlipped ? "is-flipped" : ""}`}>
                    {/* ============ DEPAN (tertutup) ============ */}
                    <div
                        className={`flip-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-4 border-white bg-linear-to-br ${palette.front} shadow-xl transition-transform duration-300 group-hover:-translate-y-1`}
                    >
                        <CrossMark
                            className={`pointer-events-none absolute -bottom-8 -right-8 text-white/20 ${compact ? "h-36 w-36 xl:h-52 xl:w-52" : "h-56 w-56"
                                }`}
                        />

                        {/* Nomor kartu */}
                        <div
                            className={`absolute z-10 flex items-center justify-center rounded-full bg-white font-black shadow-lg ${palette.icon} ${compact
                                ? "left-2 top-2 h-10 w-10 text-lg xl:h-14 xl:w-14 xl:text-2xl"
                                : "left-3 top-3 h-14 w-14 text-2xl"
                                }`}
                        >
                            {number}
                        </div>

                        {/* Ikon + judul */}
                        <div className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-0 gap-2 px-3 text-center xl:gap-3">
                            <div
                                className={`flex items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-white/50 ${compact ? "h-16 w-16 xl:h-24 xl:w-24" : "h-24 w-24 sm:h-28 sm:w-28"
                                    }`}
                            >
                                <Icon
                                    className={`${palette.icon} ${compact ? "h-9 w-9 xl:h-14 xl:w-14" : "h-14 w-14 sm:h-16 sm:w-16"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Bar bawah gelap + petunjuk kuning */}
                        <div className="relative z-10 flex items-center justify-center gap-2 px-3 py-2 bg-black/45 shrink-0">
                            <HeartbeatLine
                                className={`text-amber-300 ${compact ? "h-4 w-10 xl:h-6 xl:w-14" : "h-6 w-16"}`}
                            />
                            <span
                                className={`font-extrabold uppercase tracking-widest text-amber-300 ${compact ? "text-xs xl:text-base" : "text-base"
                                    }`}
                            >
                                Klik untuk membuka
                            </span>
                        </div>
                    </div>

                    {/* ============ BELAKANG (terbuka) ============ */}
                    <div
                        className={`flip-face flip-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-4 border-amber-300 bg-linear-to-b ${weight.back} shadow-xl`}
                    >
                        <CrossMark
                            className={`pointer-events-none absolute -left-8 -bottom-8 text-white/10 ${compact ? "h-40 w-40 xl:h-56 xl:w-56" : "h-60 w-60"
                                }`}
                        />

                        {/* Pita atas */}
                        <div
                            className={`relative z-10 flex shrink-0 items-center justify-center gap-2 bg-black/30 text-amber-300 ${compact ? "h-8 xl:h-11" : "h-12"
                                }`}
                        >
                            <CrossMark className={compact ? "h-3 w-3 xl:h-5 xl:w-5" : "h-5 w-5"} />
                            <span
                                className={`font-black uppercase tracking-[0.2em] ${compact ? "text-[11px] xl:text-base" : "text-base"
                                    }`}
                            >
                                Tema Pertanyaan
                            </span>
                            <CrossMark className={compact ? "h-3 w-3 xl:h-5 xl:w-5" : "h-5 w-5"} />
                        </div>

                        {/* Isi: KIRI = tema, KANAN = poin */}
                        <div className="relative z-10 flex items-stretch flex-1 min-h-0 gap-3 px-3 py-3 xl:gap-5 xl:px-5">
                            {/* Kiri: tema */}
                            <div className="flex items-center flex-1 min-w-0 overflow-hidden">
                                <h3
                                    style={{
                                        ...textShadow,
                                        fontSize: compact ? "clamp(2rem, 2.5vw, 1.5rem)" : "clamp(1.25rem, 3.5vw, 2.25rem)",
                                        lineHeight: "1.2",
                                    }}
                                    className="font-black tracking-wide text-white uppercase wrap-break-word"
                                >
                                    {theme}
                                </h3>
                            </div>

                            {/* Garis pemisah */}
                            <div className="w-0.5 shrink-0 self-stretch rounded-full bg-amber-300/60" />

                            {/* Kanan: poin */}
                            <div
                                className={`flex shrink-0 flex-col items-center justify-center self-center rounded-xl bg-linear-to-b from-yellow-200 via-amber-300 to-amber-500 shadow-lg ring-2 ring-white ${compact
                                    ? "w-14 py-1 xl:w-20 xl:py-2"
                                    : "w-20 py-2 sm:w-24 sm:py-3"
                                    }`}
                            >
                                <span
                                    className={`font-black leading-none tabular-nums text-slate-900 ${compact ? "text-2xl xl:text-4xl" : "text-4xl sm:text-5xl"
                                        }`}
                                >
                                    {points}
                                </span>
                                <span
                                    className={`font-extrabold uppercase tracking-[0.2em] text-slate-900 ${compact ? "text-[8px] xl:text-xs" : "mt-0.5 text-sm"
                                        }`}
                                >
                                    Poin
                                </span>
                            </div>
                        </div>

                        {/* Bar bawah hanya di popup tengah */}
                        {!compact && (
                            <div className="relative z-10 flex items-center justify-center gap-2 px-3 py-1.5 text-white bg-black/40 shrink-0">
                                <HeartbeatLine className="h-5 text-amber-300 w-14" />
                                <span className="text-base font-bold tracking-wide">
                                    Kartu {number} · Dinas Kesehatan
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}