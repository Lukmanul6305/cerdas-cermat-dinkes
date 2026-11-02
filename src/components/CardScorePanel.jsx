import { useState } from "react";

export default function CardScorePanel({
    card,
    team,
    result,
    resultTeamName,
    onSave,
    onClose,
}) {
    // Default = bobot poin kartu, tetap bisa diubah (misal poin sebagian)
    const [input, setInput] = useState(String(card.points));

    const handleSubmit = (e) => {
        e.preventDefault();
        const points = parseInt(input, 10);
        if (isNaN(points) || points < 0) return;
        onSave(points);
    };

    const shell =
        "rounded-2xl border border-slate-600 bg-slate-900 p-4 text-white shadow-2xl";

    // Kartu ini sudah dinilai
    if (result) {
        return (
            <div className={shell}>
                <p className="text-sm text-slate-300">
                    Sudah dinilai:{" "}
                    <span className="font-bold text-teal-300">{resultTeamName}</span> mendapat{" "}
                    <span className="font-black text-amber-400">+{result.points}</span> poin.
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full px-4 py-2 mt-3 text-sm font-bold rounded-lg bg-slate-700 hover:bg-slate-600"
                >
                    Tutup
                </button>
            </div>
        );
    }

    // Tidak ada tim terpilih (misal setelah dihapus)
    if (!team) {
        return (
            <div className={shell}>
                <p className="text-sm text-amber-300">
                    Tidak ada tim yang dipilih. Tutup kartu, pilih tim, lalu klik kartu ini lagi.
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full px-4 py-2 mt-3 text-sm font-bold rounded-lg bg-slate-700 hover:bg-slate-600"
                >
                    Tutup
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={shell}>
            <p className="text-xs font-bold tracking-wider uppercase text-slate-400">
                Input Skor untuk
            </p>
            <p className="text-lg font-black text-teal-300">{team.name}</p>

            <div className="flex gap-3 mt-3">
                <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    aria-label="Jumlah poin"
                    className="px-3 py-2 text-lg font-bold text-center text-white border rounded-lg w-28 border-slate-600 bg-slate-800 focus:border-teal-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-black text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-500"
                >
                    Simpan Skor
                </button>
            </div>

            <div className="flex gap-3 mt-3">
                <button
                    type="button"
                    onClick={() => onSave(0)}
                    className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-rose-900/60 text-rose-200 hover:bg-rose-900"
                >
                    Salah (0 poin)
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600"
                >
                    Tutup, nilai nanti
                </button>
            </div>
        </form>
    );
}