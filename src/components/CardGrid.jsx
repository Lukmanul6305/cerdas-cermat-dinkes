import { motion, AnimatePresence } from "framer-motion";
import FlipCard from "./FlipCard";
import CardScorePanel from "./CardScorePanel";

export default function CardGrid({
  cards, teams, selectedTeam, flippedCards, cardResults,
  activeCardId, onCardClick, onCloseCard, onSaveScore,
}) {
  const activeCard = cards.find((c) => c.id === activeCardId);
  const teamName = (teamId) => teams.find((t) => t.id === teamId)?.name ?? "Tim dihapus";

  return (
    <>
      {/* 9 kartu = 3 x 3, memenuhi tinggi wadah */}
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-3 xl:gap-4">
        {cards.map((card) => {
          const result = cardResults[card.id];
          return (
            <motion.div
              key={card.id}
              layoutId={`card-${card.id}`}
              className="relative h-full min-h-0"
              style={{ opacity: activeCardId === card.id ? 0 : 1 }}
            >
              <FlipCard
                compact
                card={card}
                isFlipped={flippedCards.has(card.id)}
                onClick={() => onCardClick(card.id)}
              />

              {result && (
                <span className="absolute z-10 max-w-[90%] -translate-x-1/2 truncate rounded-full bg-amber-300 px-3 py-0.5 text-xs font-black text-emerald-950 shadow-lg pointer-events-none bottom-2 left-1/2 xl:text-sm">
                  {teamName(result.teamId)} · +{result.points}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeCard && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseCard}
            />
            <div key="center" className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${activeCard.id}`}
                className="w-full max-w-xl pointer-events-auto"
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <FlipCard card={activeCard} isFlipped={true} onClick={() => { }} />
              </motion.div>

              <motion.div
                className="w-full max-w-xl pointer-events-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                exit={{ opacity: 0 }}
              >
                <CardScorePanel
                  key={activeCard.id}
                  card={activeCard}
                  team={selectedTeam}
                  result={cardResults[activeCard.id]}
                  resultTeamName={cardResults[activeCard.id] ? teamName(cardResults[activeCard.id].teamId) : ""}
                  onSave={(points) => onSaveScore(activeCard.id, points)}
                  onClose={onCloseCard}
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}