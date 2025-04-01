import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newMostMistakesFirstSorter (): CardOrganizer {
  function numberOfFailures (cardStatus: CardStatus): number {
    return cardStatus.getResults().filter((e) => !e.result).length
  };

  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const c = cards.slice()
      c.sort((a, b) => numberOfFailures(b) - numberOfFailures(a))
      return c
    }
  }
};

export { newMostMistakesFirstSorter }
