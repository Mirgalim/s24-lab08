import { CardStatus } from "../../cards/cardstatus.js";
import { CardOrganizer } from "../cardorganizer.js";

function newRecentMistakesFirstSorter(): CardOrganizer {
  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return cards.slice().sort((a, b) => {
        const aTime = getMostRecentMistakeTimestamp(a);
        const bTime = getMostRecentMistakeTimestamp(b);

        // Sort: most recent mistake first
        if (aTime === null && bTime === null) return 0;
        if (aTime === null) return 1;
        if (bTime === null) return -1;

        return bTime - aTime;
      });
    },
  };
}

function getMostRecentMistakeTimestamp(card: CardStatus): number | null {
  const history = card.getResults();
  for (let i = history.length - 1; i >= 0; i--) {
    if (!history[i].result) {
      return history[i].timestamp;
    }
  }
  return null;
}

export { newRecentMistakesFirstSorter };
