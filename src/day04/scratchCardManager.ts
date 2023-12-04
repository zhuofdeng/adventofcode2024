import { ScratchCard } from "./scratchCard";

export class ScratchCardManager {
    private originalCards: ScratchCard[] = [];

    addOriginalCard(card: ScratchCard) {
        this.originalCards.push(card);
    }

    getTotalWinningCards(): number {
        let total = 0;
        this.originalCards.forEach((card: ScratchCard) => {
            // recursively find all the winning cards and total them.
            total += this.findConnectedCardsCount(card)
        });

        // we got the all!
        return total + this.originalCards.length;
    }

    findConnectedCardsCount(card: ScratchCard): number {
        let total = card.cardsWon;
        for(let i = 1; i <= card.cardsWon; i++) {
            total += this.findConnectedCardsCount(this.originalCards[i + card.id])
        }
        return total;
    } 
}