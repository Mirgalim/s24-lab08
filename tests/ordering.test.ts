import { newMostMistakesFirstSorter } from "../src/ordering/prioritization/mostmistakes.js";
import { newRecentMistakesFirstSorter } from "../src/ordering/prioritization/recentmistakes.js";
import { CardStatus, newCardStatus } from "../src/cards/cardstatus.js";
import { newFlashCard } from "../src/cards/flashcard.js";

const createMostMistakesFirstSorter = newMostMistakesFirstSorter;
const createRecentMistakesFirstSorter = newRecentMistakesFirstSorter;

describe("Test prioritization", () => {
  const flashCard1 = newFlashCard("Question1", "Answer1");
  const flashCard2 = newFlashCard("Question2", "Answer2");
  const flashCard3 = newFlashCard("Question3", "Answer3");
  const flashCard4 = newFlashCard("Question4", "Answer4");
  const flashCard5 = newFlashCard("Question5", "Answer5");
  const flashCard6 = newFlashCard("Question6", "Answer6");
  const flashCard7 = newFlashCard("Question7", "Answer7");
  const flashCard8 = newFlashCard("Question8", "Answer8");
  const cardStatus1 = newCardStatus(flashCard1);
  const cardStatus2 = newCardStatus(flashCard2);
  const cardStatus3 = newCardStatus(flashCard3);
  const cardStatus4 = newCardStatus(flashCard4);
  const cardStatus5 = newCardStatus(flashCard5);
  const cardStatus6 = newCardStatus(flashCard6);
  const cardStatus7 = newCardStatus(flashCard7);
  const cardStatus8 = newCardStatus(flashCard8);
  cardStatus1.recordResult(false);
  cardStatus1.recordResult(false);
  cardStatus1.recordResult(false);
  cardStatus2.recordResult(true);
  cardStatus2.recordResult(true);
  cardStatus2.recordResult(false);
  cardStatus3.recordResult(true);
  cardStatus3.recordResult(false);
  cardStatus3.recordResult(true);
  cardStatus4.recordResult(true);
  cardStatus4.recordResult(false);
  cardStatus4.recordResult(false);
  cardStatus5.recordResult(false);
  cardStatus5.recordResult(true);
  cardStatus5.recordResult(true);
  cardStatus6.recordResult(false);
  cardStatus6.recordResult(true);
  cardStatus6.recordResult(false);
  cardStatus7.recordResult(false);
  cardStatus7.recordResult(false);
  cardStatus7.recordResult(true);
  cardStatus8.recordResult(true);
  cardStatus8.recordResult(true);
  cardStatus8.recordResult(true);

  const cards: CardStatus[] = [
    cardStatus1,
    cardStatus2,
    cardStatus3,
    cardStatus4,
    cardStatus5,
    cardStatus6,
    cardStatus7,
    cardStatus8,
  ];

  test("Test newMostMistakesFirstSorter", () => {
    const cardsSorted: CardStatus[] =
      createMostMistakesFirstSorter().reorganize(cards);
    expect(cardsSorted[0].getCard().getQuestion()).toBe("Question1");
    expect(cardsSorted[1].getCard().getQuestion()).toBe("Question4");
    expect(cardsSorted[2].getCard().getQuestion()).toBe("Question6");
    expect(cardsSorted[3].getCard().getQuestion()).toBe("Question7");
    expect(cardsSorted[4].getCard().getQuestion()).toBe("Question2");
    expect(cardsSorted[5].getCard().getQuestion()).toBe("Question3");
    expect(cardsSorted[6].getCard().getQuestion()).toBe("Question5");
    expect(cardsSorted[7].getCard().getQuestion()).toBe("Question8");
  });

  test("Test recentRecentMistakesFirstSorter", () => {
    let time = 1000;
    const next = () => (time += 1000);

    cardStatus1.clearResults();
    cardStatus2.clearResults();
    cardStatus3.clearResults();
    cardStatus4.clearResults();
    cardStatus5.clearResults();
    cardStatus6.clearResults();
    cardStatus7.clearResults();
    cardStatus8.clearResults();

    cardStatus1.recordResult(false, next());
    cardStatus1.recordResult(false, next());
    cardStatus1.recordResult(false, next());

    cardStatus2.recordResult(true, next());
    cardStatus2.recordResult(true, next());
    cardStatus2.recordResult(false, next());

    cardStatus3.recordResult(true, next());
    cardStatus3.recordResult(false, next());
    cardStatus3.recordResult(true, next());

    cardStatus4.recordResult(true, next());
    cardStatus4.recordResult(false, next());
    cardStatus4.recordResult(false, next());

    cardStatus5.recordResult(false, next());
    cardStatus5.recordResult(true, next());
    cardStatus5.recordResult(true, next());

    cardStatus6.recordResult(false, next());
    cardStatus6.recordResult(true, next());
    cardStatus6.recordResult(false, next());

    cardStatus7.recordResult(false, next());
    cardStatus7.recordResult(false, next());
    cardStatus7.recordResult(true, next());

    cardStatus8.recordResult(true, next());
    cardStatus8.recordResult(true, next());
    cardStatus8.recordResult(true, next());

    const cards: CardStatus[] = [
      cardStatus1,
      cardStatus2,
      cardStatus3,
      cardStatus4,
      cardStatus5,
      cardStatus6,
      cardStatus7,
      cardStatus8,
    ];
    const cardsSorted = createRecentMistakesFirstSorter().reorganize(cards);

    console.log("==== Sorted:");
    for (const c of cardsSorted) {
      console.log(c.getCard().getQuestion(), c.getResults());
    }

    expect(cardsSorted.map((c) => c.getCard().getQuestion())).toEqual([
      "Question7",
      "Question6",
      "Question5",
      "Question4",
      "Question3",
      "Question2",
      "Question1",
      "Question8"
    ]);
  });
  test('Both cards have no mistakes', () => {
    const c1 = newCardStatus(newFlashCard('Q1', 'A1'))
    const c2 = newCardStatus(newFlashCard('Q2', 'A2'))
  
    const sorted = createRecentMistakesFirstSorter().reorganize([c1, c2])
    expect(sorted.length).toBe(2)
  })
  
  test('First card has no mistake, second has one', () => {
    const c1 = newCardStatus(newFlashCard('Q1', 'A1'))
    const c2 = newCardStatus(newFlashCard('Q2', 'A2'))
    c2.recordResult(false, 1000)
  
    const sorted = createRecentMistakesFirstSorter().reorganize([c1, c2])
    expect(sorted[0].getCard().getQuestion()).toBe('Q2')
  })
  
  test('Second card has no mistake, first has one', () => {
    const c1 = newCardStatus(newFlashCard('Q1', 'A1'))
    const c2 = newCardStatus(newFlashCard('Q2', 'A2'))
    c1.recordResult(false, 1000)
  
    const sorted = createRecentMistakesFirstSorter().reorganize([c1, c2])
    expect(sorted[0].getCard().getQuestion()).toBe('Q1')
  })
});
