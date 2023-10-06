import { Component, OnInit } from '@angular/core';
import { DeckService } from './services/deck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

	constructor(private _deckService:DeckService){}
	
	
	ngOnInit(): void {
		console.log("teste");
		
		this._deckService.startGame()
	}
	
  
}
