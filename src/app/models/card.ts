export class Card {
	private readonly suit:string 
	private readonly value:number

	constructor(value: number, suit: string) {
    this.value = value;
    this.suit = suit;
  }

  getCardSuit(): string {
    return `${this.suit}`;
  }

	getCardValue():number{
		return this.value
	}
}

