import { HiTrophy, HiArrowPath, HiUserGroup } from "react-icons/hi2";

export default function Header({ onOpenScoreModal, onOpenTeamModal, onResetGame }) {
  return (
    <header className="flex flex-col gap-4 pb-5 mb-8 border-b border-slate-700 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="flex">
          <img src="logo.png" alt="logo" className="w-10" />
          <h1 className="text-2xl font-black text-teal-50 sm:text-3xl">
            Cerdas Cermat Dinas Kesehatan
          </h1>
        </span>
        <p className="mt-1 text-xs text-slate-400">
          Papan Kuis Interaktif Tema & Bobot Poin
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onOpenTeamModal}
          className="flex items-center gap-1.5 rounded-l-xl border border-teal-500/40 bg-slate-800 px-4 py-2 text-xs font-bold text-teal-300 transition-colors hover:bg-slate-700"
        >
          <HiUserGroup className="w-4 h-4" />
          Kelola Tim
        </button>

        <button
          onClick={onOpenScoreModal}
          className="flex items-center gap-1.5 border border-amber-500/40 bg-slate-800 px-4 py-2 text-xs font-bold text-amber-400 transition-colors hover:bg-slate-700"
        >
          <HiTrophy className="w-4 h-4" />
          Lihat Skor
        </button>

        <button
          onClick={onResetGame}
          className="flex items-center gap-1.5 rounded-r-xl border border-rose-500/30 bg-slate-800 px-3 py-2 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-900/30"
          title="Reset seluruh pertandingan"
        >
          <HiArrowPath className="w-4 h-4" />
          Reset Game
        </button>
      </div>
    </header>
  );
}