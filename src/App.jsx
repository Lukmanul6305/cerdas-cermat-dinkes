import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import TeamSelector from "./components/TeamSelector";
import CardGrid from "./components/CardGrid";
import ScoreModal from "./components/ScoreModal";
import TeamModal from "./components/TeamModal";
import { CARDS_DATA } from "./data/cards";
import { loadGameState, saveGameState, clearGameState, DEFAULT_STATE } from "./utils/storage";

// Samakan dengan durasi flip di CSS (.flip-inner)
const FLIP_DURATION_MS = 700;

export default function App() {
  const [gameState, setGameState] = useState(() => loadGameState());
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null); // UI saja, tidak disimpan
  const [notice, setNotice] = useState("");

  const timerRef = useRef(null);
  const noticeTimerRef = useRef(null);

  const { teams, selectedTeamId, flippedCardIds, cardResults } = gameState;
  const selectedTeam = teams.find((t) => t.id === selectedTeamId) ?? null;

  // Auto save
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Bersihkan timer saat unmount
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      clearTimeout(noticeTimerRef.current);
    },
    []
  );

  // Esc menutup kartu tengah
  useEffect(() => {
    if (activeCardId === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveCardId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCardId]);

  const showNotice = (message) => {
    setNotice(message);
    clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => setNotice(""), 2500);
  };

  /* ---------- Tim ---------- */

  const handleSelectTeam = (teamId) => {
    setGameState((prev) => ({
      ...prev,
      selectedTeamId: prev.selectedTeamId === teamId ? null : teamId,
    }));
  };

  const handleAddTeam = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGameState((prev) => {
      const nextId = Math.max(0, ...prev.teams.map((t) => t.id)) + 1;
      return { ...prev, teams: [...prev.teams, { id: nextId, name: trimmed, score: 0 }] };
    });
  };

  const handleRenameTeam = (teamId, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, name: trimmed } : t)),
    }));
  };

  const handleDeleteTeam = (teamId) => {
    setGameState((prev) => {
      if (prev.teams.length <= 1) return prev; // minimal 1 tim
      return {
        ...prev,
        teams: prev.teams.filter((t) => t.id !== teamId),
        selectedTeamId: prev.selectedTeamId === teamId ? null : prev.selectedTeamId,
      };
    });
  };

  const handleSetScore = (teamId, newScore) => {
    const value = Math.max(0, Math.floor(Number(newScore)));
    if (Number.isNaN(value)) return;
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, score: value } : t)),
    }));
  };

  const handleReorderTeams = (activeId, overId) => {
    setGameState((prev) => {
      const from = prev.teams.findIndex((t) => t.id === activeId);
      const to = prev.teams.findIndex((t) => t.id === overId);
      if (from < 0 || to < 0 || from === to) return prev;

      const nextTeams = [...prev.teams];
      const [moved] = nextTeams.splice(from, 1);
      nextTeams.splice(to, 0, moved);
      return { ...prev, teams: nextTeams };
    });
  };

  /* ---------- Kartu ---------- */

  const handleCardClick = (cardId) => {
    if (!selectedTeam) {
      showNotice("Pilih tim terlebih dahulu sebelum memilih kartu.");
      return;
    }

    // Sudah terbuka: tidak flip ulang, tampilkan di tengah
    if (flippedCardIds.includes(cardId)) {
      setActiveCardId(cardId);
      return;
    }

    // Belum terbuka: flip dulu, lalu geser ke tengah
    setGameState((prev) =>
      prev.flippedCardIds.includes(cardId)
        ? prev
        : { ...prev, flippedCardIds: [...prev.flippedCardIds, cardId] }
    );
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveCardId(cardId), FLIP_DURATION_MS);
  };

  const handleCloseCard = () => setActiveCardId(null);

  // Simpan skor kartu ke tim yang sedang dipilih
  const handleSaveScore = (cardId, points) => {
    if (!selectedTeam || cardResults[cardId]) return;

    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) =>
        t.id === prev.selectedTeamId ? { ...t, score: t.score + points } : t
      ),
      cardResults: {
        ...prev.cardResults,
        [cardId]: { teamId: prev.selectedTeamId, points },
      },
      selectedTeamId: null, // giliran berikutnya harus pilih tim lagi
    }));

    showNotice(`+${points} poin untuk ${selectedTeam.name}`);
    setActiveCardId(null);
  };

  // Tutup semua kartu (skor tim tetap)
  const handleResetCards = () => {
    if (flippedCardIds.length === 0) return;
    if (!window.confirm("Tutup semua kartu? Skor tim tidak akan berubah.")) return;

    clearTimeout(timerRef.current);
    setActiveCardId(null);
    setGameState((prev) => ({ ...prev, flippedCardIds: [], cardResults: {} }));
  };

  // Reset seluruh pertandingan
  const handleResetGame = () => {
    if (
      !window.confirm(
        "Reset seluruh data pertandingan (tim, skor, dan kartu)? Tindakan ini tidak bisa dibatalkan."
      )
    )
      return;

    clearTimeout(timerRef.current);
    setActiveCardId(null);
    clearGameState();
    setGameState(DEFAULT_STATE);
  };

  return (
    <main className="text-white bg-slate-800">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Layar 1: header + pilih tim */}
        <div className="pt-5">
          <Header
            onOpenScoreModal={() => setIsScoreModalOpen(true)}
            onOpenTeamModal={() => setIsTeamModalOpen(true)}
            onResetGame={handleResetGame}
          />
          <TeamSelector
            teams={teams}
            selectedTeamId={selectedTeamId}
            onSelectTeam={handleSelectTeam}
            onReorder={handleReorderTeams}
          />
        </div>

        {/* Layar 2: papan kartu = 1 layar penuh */}
        <section
          aria-label="Papan kartu cerdas cermat"
          className="flex flex-col py-4 h-dvh"
        >
          <div className="flex items-center justify-between gap-3 mb-3 shrink-0">
            <h2 className="text-lg font-bold text-white">2. Pilih Kartu</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                Terbuka: {flippedCardIds.length} / {CARDS_DATA.length}
              </span>
              <button
                type="button"
                onClick={handleResetCards}
                disabled={flippedCardIds.length === 0}
                className="px-4 py-1.5 text-sm font-bold text-white transition rounded-lg bg-emerald-700 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reset Kartu
              </button>
            </div>
          </div>

          {/* flex-1 + min-h-0: grid mengisi sisa tinggi layar */}
          <div className="flex-1 min-h-0">
            <CardGrid
              cards={CARDS_DATA}
              teams={teams}
              selectedTeam={selectedTeam}
              flippedCards={new Set(flippedCardIds)}
              cardResults={cardResults}
              activeCardId={activeCardId}
              onCardClick={handleCardClick}
              onCloseCard={handleCloseCard}
              onSaveScore={handleSaveScore}
            />
          </div>
        </section>

        <ScoreModal
          isOpen={isScoreModalOpen}
          onClose={() => setIsScoreModalOpen(false)}
          teams={teams}
          onSetScore={handleSetScore}
        />
        <TeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          teams={teams}
          onAddTeam={handleAddTeam}
          onRenameTeam={handleRenameTeam}
          onDeleteTeam={handleDeleteTeam}
        />
      </div>

      {notice && (
        <div
          role="status"
          className="fixed px-5 py-3 text-sm font-bold -translate-x-1/2 border shadow-2xl z-70 rounded-xl bottom-6 left-1/2 border-amber-400/40 bg-slate-900 text-amber-300"
        >
          {notice}
        </div>
      )}
    </main>
  );
}