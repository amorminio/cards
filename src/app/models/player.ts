import { Card } from "./card"

export class Player{

	private id:string | undefined
	private next:any | undefined
	private points:number = 0
	private cards:Array<Card> =[]

	constructor(id:string,next:string){
		this.id = id
		this.next = next
	}

	pushCard(card:Card):void{
		this.cards.push(card)
	}

	drawRandomCard():Card{
		return this.cards.pop()!
	}

	drawSelectedCard(card:Card):Card{
		this.cards = this.cards.filter((selectedCard)=>{
			return selectedCard.getCardSuit() !== card.getCardSuit() && selectedCard.getCardValue() !== card.getCardValue()
		})

		return card
	}

	concatCards(newCards:Array<Card>){
		this.cards = this.cards.concat(newCards)
	}

	checkCard(card:Card):boolean{
		let found:boolean = false
		this.cards.forEach(search=>{
			if(search.getCardValue() === card.getCardValue() && search.getCardSuit() === card.getCardSuit()){
				found = true
			}
		})
		
		return found
	}

	// Accessors
	setPoints(points:number):void{
		this.points = points
	}
	
	getPoints():number{
		return this.points
	}

	getId():any{
		return this.id
	}

	setNext(player:Player){
		this.next = player
	}
	
	getNext():string{
		return this.next
	}

}