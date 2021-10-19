import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as socketIo from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';


@Injectable({
	providedIn: 'root'
})
export class SocketsService {
	private socket;
	constructor() { }
	initSocket(){
		this.socket = socketIo(SERVER_URL);
	}

	onMessage(){
		let observable = new Observable(observer=>{
			this.socket.on('message', (data) => {
				observer.next(data)
			});
		});
		return observable;
	}

	chat(msg:Object){
		this.socket.emit("message", msg);
	}

}
