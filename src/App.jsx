import { useState } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import { CARDS_DATA } from "./data/cards";

export default function App() {
  const [flippedCards, setFlippedCards] = useState(() => new Set());

  function handleCardClick(cardId) {
    setFlippedCards((currentCards) => {
      const nextCards = new Set(currentCards);

      if (nextCards.has(cardId)) {
        nextCards.delete(cardId);
      } else {
        nextCards.add(cardId);
      }

      return nextCards;
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Header />

        <section aria-label="Papan kartu cerdas cermat">
          <h2 className="mb-5 text-lg font-bold text-white">
            Papan Kartu
          </h2>

          <CardGrid
            cards={CARDS_DATA}
            flippedCards={flippedCards}
            onCardClick={handleCardClick}
          />
        </section>

        <footer className="mt-12 text-center text-xs text-slate-500">
          Cerdas Cermat Dinas Kesehatan
        </footer>
      </div>
    </main>
  );
}