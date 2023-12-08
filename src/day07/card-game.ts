const STRENGTH_MAP: Record<string, number> = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'J': 10,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
}

export class CardGame {
    private _suits: Map<string, number> = new Map();
    private _originalHand = '';
    private _betAmount: number;
    private _typeRank = 0;
    private _strength = 0;
    constructor(input: string, checkJoker=false) {
        const card = input.split(' ');
        this._betAmount = parseInt(card[1]);
        this._originalHand = card[0];
        if(checkJoker) {
            STRENGTH_MAP['J'] = 0;
        }
        for(let i = 0; i < card[0].length; i++) {
            let value = this._suits.get(card[0][i]) || 0;
            if (value) {
                value += 1;
            } else {
                value = 1;
            }
            this._suits.set(card[0][i], value);
        }

        // sort the values.
        this._suits = new Map([...this._suits.entries()].sort((a, b) => b[1] - a[1]));

        if(checkJoker && this._suits.size > 1) {
            const jokers = this._suits.get('J');
            if (jokers) {
                this._suits.delete('J');
                let keyToMock = 'J';
                let newValue = 1;
                for(const [key, value] of this._suits) {
                    if(value >= newValue) {
                        if(STRENGTH_MAP[key] > STRENGTH_MAP[keyToMock]) {
                            keyToMock = key;
                            newValue = value;
                        }
                    }
                }
                this._suits.set(keyToMock, newValue + jokers);
            }

            this._suits = new Map([...this._suits.entries()].sort((a, b) => b[1] - a[1]));
        }
        
        this.calculateType();
    }

    calculateType(): void {
        const valuesArray = Array.from(this._suits.values());
        // console.log(`values: ${JSON.stringify(valuesArray)}`)
        if (valuesArray.length === 5) { // all different cards
            this._typeRank = 1;
        } else if (valuesArray.length === 4) { // one pair
            this._typeRank = 2;
        } else if (valuesArray.length === 3) {
            // three district sets
            // counld be three of a kind, two pairs or one pair
            const firstValue = valuesArray[0];
            // three of a kind
            if(firstValue === 3) {
                this._typeRank = 4;
            } else {  // two pairs
                this._typeRank = 3;
            }
        } else if (valuesArray.length === 2) {
            // two different distinct sets
            // could be three of a kind with a pair or 4 of a kind
            const firstValue = valuesArray[0]
            if (firstValue === 4) {// four of a kind
                this._typeRank = 6;
            } else if (firstValue === 3) { // 3 of a kind with a pair <full house>
                this._typeRank = 5;
            }
        } else if (valuesArray.length === 1) {
            // all the game are the same. Five of a Kind.
            this._typeRank = 7;
        }
    }

    compare(card: CardGame): boolean {
        const cardKeys = this._originalHand;
        const otherCardKeys = card.originalHand;

        for(let i = 0; i < cardKeys.length; i++) {
            if (STRENGTH_MAP[cardKeys[i]] === STRENGTH_MAP[otherCardKeys[i]]) {
                continue;
            } else {
                return STRENGTH_MAP[cardKeys[i]] > STRENGTH_MAP[otherCardKeys[i]]
            }
        }

        return false;
    }
    printCard() {
        console.log(`Card --- bet:${this.betAmount} hand: ${this._originalHand} suites: ${this._suits.size}`)
        for (const [key, value] of this._suits) {
            console.log(`key: ${key}: value: ${value}`)
        }
    }
    get strength() {
        return this._strength;
    }

    get betAmount() {
        return this._betAmount;
    }

    get typeRank() {
        return this._typeRank;
    }

    get originalHand() {
        return this._originalHand;
    }
}