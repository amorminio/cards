import { Injectable } from '@angular/core';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root'
})
export class GameService {

	code:number | undefined
	deck:Deck = new Deck(false)
	
  constructor() { }

	
}
