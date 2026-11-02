import FlipCard from "./FlipCard";

export default function CardGrid({
  cards,
  flippedCards,
  onCardClick,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {cards.map((card) => (
        <FlipCard
          key={card.id}
          card={card}
          isFlipped={flippedCards.has(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}