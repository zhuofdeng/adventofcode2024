export class ScratchCard {
    private winningNumbers: string[];
    private cardNumbers: string[];
    private _cardId: number;
    private _total = 0;
    private _cardsWon = 0;
    constructor(input: string, index: number) {
        this._cardId = index;
        const cardConfig = input.split(': ')[1].split(' | ');
        this.winningNumbers = cardConfig[0].split(' ').filter(v => v !== '');
        this.cardNumbers = cardConfig[1].split(' ').filter(v => v !== '');

        this.cardNumbers.forEach((number) => {
            if (this.winningNumbers.includes(number)) {
                this._cardsWon += 1;
                if (this._total === 0) {
                    this._total = 1;
                } else {
                    this._total *= 2;
                }
            }
        });
    }

    get total() {
        return this._total;
    }

    get cardsWon() {
        return this._cardsWon;
    }

    get id() {
        return this._cardId;
    }
}