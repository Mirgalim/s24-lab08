import { FlashCard } from './flashcard.js'

interface ResultRecord {
  result: boolean
  timestamp: number
}

interface CardStatus {
  getCard: () => FlashCard
  getResults: () => ResultRecord[]
  recordResult: (success: boolean, timestamp?: number) => void
  clearResults: () => void
}

function newCardStatus (card: FlashCard): CardStatus {
  let successes: ResultRecord[] = []

  return {
    getCard: () => card,
    getResults: () => successes.slice(),
    recordResult: (success: boolean, timestamp: number = Date.now()) => {
      successes.push({ result: success, timestamp })
    },
    clearResults: () => { successes = [] }
  }
}

export { CardStatus, newCardStatus }
