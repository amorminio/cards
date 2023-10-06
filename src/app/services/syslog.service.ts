import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SyslogService {

	constructor() { }

	debug(message:string,additionalInfo?:any){
		console.debug(message,' - ' ,additionalInfo)
	}


}
