/**
 * 
 * @param {Array<Card>} deck 
 * @param {Array<Card>} hand 
 * @param {number} count 
 */
export function dealDeckToHand(deck, hand, count)
{
    for(count; count > 0; count--)
    {
        hand.push(deck.pop());
    }
}

export function sum(a, b) {
  return a + b
}