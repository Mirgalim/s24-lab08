import { newFlashCard } from '../src/cards/flashcard.js'

describe('FlashCard', () => {
  const card1 = newFlashCard('Capital of France', 'Paris')
  const card2 = newFlashCard('Capital of France', 'Paris') 
  const card3 = newFlashCard('Capital of France', 'paris') 
  const card4 = newFlashCard('Capital of Mongolia', 'Ulaanbaatar')

  test('getQuestion returns correct question', () => {
    expect(card1.getQuestion()).toBe('Capital of France')
  })

  test('getAnswer returns correct answer', () => {
    expect(card1.getAnswer()).toBe('Paris')
  })

  test('checkSuccess returns true for exact match', () => {
    expect(card1.checkSuccess('Paris')).toBe(true)
  })

  test('checkSuccess is case-insensitive and trims whitespace', () => {
    expect(card1.checkSuccess(' paris ')).toBe(true)
    expect(card1.checkSuccess('PARIS')).toBe(true)
  })

  test('checkSuccess returns false for wrong answer', () => {
    expect(card1.checkSuccess('London')).toBe(false)
  })

  test('toString returns formatted string', () => {
    expect(card1.toString()).toBe('FlashCard[Capital of France, Paris]')
  })

  test('equals returns true for identical question and answer', () => {
    expect(card1.equals(card2)).toBe(true)
  })

  test('equals returns false for same question but different answer', () => {
    expect(card1.equals(card3)).toBe(false)
  })

  test('equals returns false for completely different card', () => {
    expect(card1.equals(card4)).toBe(false)
  })
})
