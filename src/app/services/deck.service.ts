import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

	private cards: Array<Card> = [];
	private values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	private suits = ["hearts", "diamonds", "clubs", "spades"];
	
	private player1:Player = new Player('p1','p2')
	private player2:Player = new Player('p2','p3')
	private player3:Player = new Player('p3','p4')
	private player4:Player = new Player('p4','p1')
	
	private p1Pass:Array<Card> = [];
	private p2Pass:Array<Card> = [];
	private p3Pass:Array<Card> = [];
	private p4Pass:Array<Card> = [];
	
	
	//Game Controls
	private firstRoundPlayer:Player | undefined
	private nextPlayer:Player | undefined
	private round:number = 0
	private heartsCrash:boolean = false
	private turnTable:any = {}
	private lastTurnWinner!:Player
	private scoreBoard:Array<number> = []


	//Delete soon
	private loopteste:number = 0


  constructor() { }

	initDeck(){
		this.cards = []

		for (const suit of this.suits) {
			for (const rank of this.values) {
				const card = new Card(rank, suit);
				this.cards.push(card);
			}
		}	
		this.shuffle()	
	}

	shuffle():void {
		 for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	getSize(): number {
		return this.cards.length;
	}

	print():void{

		console.log('Game Cards',this.cards)
		console.log('==========================================================================');

		console.log('ROUND \n:',this.round)

		console.log('player 1',this.player1)
		console.log('player 2',this.player2)
		console.log('player 3',this.player3)
		console.log('player 4',this.player4)

		console.log('player 1',this.p1Pass)
		console.log('player 2',this.p2Pass)
		console.log('player 3',this.p3Pass)
		console.log('player 4',this.p4Pass)

		console.log('Start Player',this.firstRoundPlayer)

	}

	addJokers(){
		this.cards.push( new Card(0, "Joker"),  new Card(0, "Joker"))
	}

	
	initRound(){
		
		this.initDeck()
		this.cardsDeal()
		
		this.turnTable = []
		
		if(this.round % 4 !== 0){
			this.selectPassCards()
			this.passCards()
		}
		
		this.print()
		
	}

	// Inicia o jogo
	startGame(){
		this.clear()
		console.log('Start Game');
		

		while(this.checkScore()){
			debugger
			this.initRound()
			this.runRound()


			this.round++		
			
		}
	}

	runRound(){
		let nextPlayer

		for (let turnCount = 0;turnCount<12;turnCount++){

			let playerCount=0
	
			this.checkFirstPlayer()
			this.turnTable[this.firstRoundPlayer?.getId()] = this.firstRoundPlayer?.drawSelectedCard(new Card(2,'clubs'))
			nextPlayer =  this.firstRoundPlayer?.getNext()											
		
			do{
				switch(nextPlayer){
					case 'p1':
						this.turnTable[this.player1.getId()] = 	this.player1.drawRandomCard()
						nextPlayer = this.player1.getNext()
						break
					case 'p2':
						this.turnTable[this.player2.getId()] = 	this.player2.drawRandomCard()
						nextPlayer = this.player2.getNext()
						break
					case 'p3':
						this.turnTable[this.player3.getId()] = 	this.player3.drawRandomCard()
						nextPlayer = this.player3.getNext()
						break
					case 'p4':
						this.turnTable[this.player1.getId()] = 	this.player4.drawRandomCard()
						nextPlayer = this.player4.getNext()
						break
				}
				
				playerCount++
				
			}while(playerCount<2)

			this.updateScore()
		}
	}

	updateScore(){
		for ( let key in this.turnTable ){
			console.log(this.turnTable);
			console.log(key);
		}
	}

	checkScore():boolean{
		this.loopteste ++;
		return this.loopteste !== 13
	}

	// Distribui um deck entre os 4 jogadores
	cardsDeal():void{
		while(this.cards.length > 0){
			this.player1.pushCard(this.cards.pop()!)
			this.player2.pushCard(this.cards.pop()!)
			this.player3.pushCard(this.cards.pop()!)
			this.player4.pushCard(this.cards.pop()!)
		}
	}

	//Limpa todas as variáveis de controle de uma partida
	clear(){
		this.player1.setPoints(0)
		this.player2.setPoints(0)
		this.player3.setPoints(0)
		this.player4.setPoints(0)

		this.p1Pass = []
		this.p2Pass = []
		this.p3Pass = []
		this.p4Pass = []

		this.round=0
		this.turnTable = []
	}



	// 1 - cada jogador seleciona 3 cartas
	// 2 - de acordo com o turno, passa essas cartas para a esquerda, direita, frente ou não passa.
	selectPassCards(){
		this.p1Pass.push(this.player1.drawRandomCard())
		this.p1Pass.push(this.player1.drawRandomCard())
		this.p1Pass.push(this.player1.drawRandomCard())
		
		this.p2Pass.push(this.player2.drawRandomCard())
		this.p2Pass.push(this.player2.drawRandomCard())
		this.p2Pass.push(this.player2.drawRandomCard())
		
		this.p3Pass.push(this.player3.drawRandomCard())
		this.p3Pass.push(this.player3.drawRandomCard())
		this.p3Pass.push(this.player3.drawRandomCard())
		
		this.p4Pass.push(this.player4.drawRandomCard())
		this.p4Pass.push(this.player4.drawRandomCard())
		this.p4Pass.push(this.player4.drawRandomCard())
	}

	passCards(){
		const checkRound = this.round % 4

		switch (checkRound){
			case 1: //esquerda
				this.player1.concatCards(this.p4Pass)
				this.p4Pass=[]	
				this.player2.concatCards(this.p1Pass)
				this.p1Pass=[]			
				this.player3.concatCards(this.p2Pass)
				this.p2Pass=[]			
				this.player4.concatCards(this.p3Pass)
				this.p3Pass=[]			
				return
			case 2: // direita
				this.player1.concatCards(this.p2Pass)
				this.p2Pass=[]			
				this.player2.concatCards(this.p3Pass)
				this.p3Pass=[]			
				this.player3.concatCards(this.p4Pass)
				this.p4Pass=[]			
				this.player4.concatCards(this.p1Pass)
				this.p1Pass=[]			
				return
			case 3:
				this.player1.concatCards(this.p3Pass)
				this.p3Pass=[]			
				this.player2.concatCards(this.p4Pass)
				this.p4Pass=[]			
				this.player3.concatCards(this.p1Pass)
				this.p1Pass=[]			
				this.player4.concatCards(this.p2Pass)
				this.p2Pass=[]							
				return
			default:
				return			
		}

	}

	checkFirstPlayer(){

		if (this.round === 0){
			const startCard = new Card(2,'clubs')
			this.player1.checkCard(startCard)? this.firstRoundPlayer=this.player1 : null
			this.player2.checkCard(startCard)? this.firstRoundPlayer=this.player2 : null
			this.player3.checkCard(startCard)? this.firstRoundPlayer=this.player3 : null
			this.player4.checkCard(startCard)? this.firstRoundPlayer=this.player4 : null
		}

		else{
			this.firstRoundPlayer = this.lastTurnWinner;
		}
		
	}

	


}
