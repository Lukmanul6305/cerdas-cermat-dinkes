import { useState } from "react";
import { HiXMark, HiTrophy, HiPencilSquare } from "react-icons/hi2";
import AnimatedNumber from "./AnimatedNumber";

// Gaya per peringkat: emas, perak, perunggu, lainnya
const RANK_STYLES = {
  1: {
    card: "border-yellow-300 bg-gradient-to-b from-yellow-500/30 to-slate-900 shadow-[0_0_30px_rgba(250,204,21,0.35)]",
    badge: "bg-yellow-300 text-slate-900",
    score: "text-yellow-300",
  },
  2: {
    card: "border-slate-300 bg-gradient-to-b from-slate-400/25 to-slate-900",
    badge: "bg-slate-200 text-slate-900",
    score: "text-slate-100",
  },
  3: {
    card: "border-orange-400 bg-gradient-to-b from-orange-500/25 to-slate-900",
    badge: "bg-orange-400 text-slate-900",
    score: "text-orange-300",
  },
};
const DEFAULT_RANK_STYLE = {
  card: "border-slate-600 bg-slate-900",
  badge: "bg-slate-600 text-white",
  score: "text-amber-300",
};

export default function ScoreModal({ isOpen, onClose, teams, onSetScore }) {
  const [editingId, setEditingId] = useState(null);
  const [tempScore, setTempScore] = useState("");

  if (!isOpen) return null;

  // Peringkat dengan penanganan skor seri
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const rankedTeams = sortedTeams.map((team) => ({
    ...team,
    rank: sortedTeams.findIndex((item) => item.score === team.score) + 1,
  }));

  const startEdit = (team) => {
    setEditingId(team.id);
    setTempScore(String(team.score));
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = (teamId) => {
    const value = parseInt(tempScore, 10);
    if (isNaN(value) || value < 0) {
      alert("Masukkan skor berupa angka 0 atau lebih.");
      return;
    }
    onSetScore(teamId, value);
    setEditingId(null);
  };

  const handleClose = () => {
    setEditingId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-60 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl p-6 text-white border-2 shadow-2xl rounded-3xl border-slate-600 bg-slate-900 max-h-[94vh] overflow-y-auto xl:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-700">
          <div className="flex items-center gap-3">
            <HiTrophy className="text-yellow-300 w-9 h-9 xl:h-12 xl:w-12" />
            <h2 className="text-3xl font-black tracking-wide uppercase xl:text-5xl">
              Papan Skor
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Tutup"
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <HiXMark className="w-8 h-8 xl:h-10 xl:w-10" />
          </button>
        </div>

        {/* Kartu tim */}
        <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {rankedTeams.map((team) => {
            const isEditing = editingId === team.id;
            const style = RANK_STYLES[team.rank] ?? DEFAULT_RANK_STYLE;
            const isLeader = team.rank === 1 && team.score > 0;

            return (
              <div
                key={team.id}
                className={`relative flex flex-col items-center rounded-2xl border-4 px-4 py-5 xl:py-7 ${style.card}`}
              >
                {/* Lencana peringkat */}
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-black xl:h-14 xl:w-14 xl:text-3xl ${style.badge}`}
                  >
                    {team.rank}
                  </span>
                  {isLeader && <span className="text-3xl xl:text-5xl" aria-hidden="true">👑</span>}
                </div>

                {/* Nama tim (tidak bisa diubah di sini) */}
                <h3 className="mt-3 text-xl font-black leading-tight text-center text-white wrap-break-word xl:text-3xl">
                  {team.name}
                </h3>

                {isEditing ? (
                  <div className="flex flex-col items-center w-full gap-3 mt-4">
                    <input
                      autoFocus
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={tempScore}
                      onChange={(e) => setTempScore(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(team.id);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      aria-label={`Skor ${team.name}`}
                      className="w-full px-3 py-2 text-4xl font-black text-center text-yellow-300 border-2 border-teal-400 rounded-xl bg-slate-950 focus:outline-none"
                    />
                    <div className="flex w-full gap-2">
                      <button
                        onClick={() => saveEdit(team.id)}
                        className="flex-1 py-2 text-base font-bold bg-teal-600 rounded-lg hover:bg-teal-500"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 py-2 text-base font-bold rounded-lg bg-slate-700 hover:bg-slate-600"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Skor raksasa */}
                    <AnimatedNumber
                      value={team.score}
                      duration={900}
                      className={`mt-2 text-6xl font-black leading-none tabular-nums xl:text-8xl ${style.score}`}
                    />
                    <span className="mt-1 text-sm font-extrabold tracking-[0.3em] uppercase text-slate-300 xl:text-xl">
                      Poin
                    </span>

                    <button
                      onClick={() => startEdit(team)}
                      aria-label={`Edit skor ${team.name}`}
                      title="Edit skor"
                      className="absolute p-2 rounded-lg right-2 top-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                    >
                      <HiPencilSquare className="w-5 h-5 xl:h-6 xl:w-6" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}