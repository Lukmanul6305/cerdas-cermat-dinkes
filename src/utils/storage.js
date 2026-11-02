const STORAGE_KEY = "cerdas-cermat-game-v2";

export const DEFAULT_STATE = {
  teams: [
    { id: 1, name: "Kelompok 1", score: 0 },
    { id: 2, name: "Kelompok 2", score: 0 },
    { id: 3, name: "Kelompok 3", score: 0 },
  ],
  selectedTeamId: null, // tim yang sedang memilih kartu
  flippedCardIds: [],   // kartu yang sudah dibuka
  cardResults: {},      // { [cardId]: { teamId, points } }
};

export function loadGameState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw);

    const teams =
      Array.isArray(saved.teams) && saved.teams.length > 0
        ? saved.teams
        : DEFAULT_STATE.teams;

    return {
      teams,
      selectedTeamId: teams.some((t) => t.id === saved.selectedTeamId)
        ? saved.selectedTeamId
        : null,
      flippedCardIds: Array.isArray(saved.flippedCardIds) ? saved.flippedCardIds : [],
      cardResults:
        saved.cardResults && typeof saved.cardResults === "object"
          ? saved.cardResults
          : {},
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveGameState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // abaikan jika storage penuh / diblokir
  }
}

export function clearGameState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // abaikan
  }
}