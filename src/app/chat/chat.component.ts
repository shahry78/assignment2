import { Component, OnInit } from '@angular/core';
import { DatamanagerService } from '../services/datamanager.service';

import { SocketsService } from '../services/socketmanager.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private data:DatamanagerService, private socket:SocketsService) { }
  
	name = localStorage.getItem("name");
	email = localStorage.getItem("email");
	
	valid = false;

	msgList:any;
	groupList:any;
	channelList:any;
	
	ioConnection:any;
	chatmessage:string = ""

	async messageList(cID) {
		console.log(cID)
		//Emit Socket Saying Joined Chat
		this.msgList= await this.data.messageList(cID)
		localStorage.setItem("channel-id",cID)
		console.log(this.msgList);
	}

	async chatSubmit() {
		if (this.chatmessage){
			console.log(this.chatmessage)
			const today = new Date();
			const time = today.getHours() + ":" + today.getMinutes()
			const cID = parseInt(localStorage.getItem("channel-id"))

			const msg = { time: time, user: this.name, body: this.chatmessage, cID: cID };
			console.log(msg)
			this.socket.chat(msg)
			// Clear the chat message
			this.chatmessage=null;
		}
	}

	async ngOnInit() {
		//console.log("Reached account.ts");
		this.valid = this.data.userValid();
		if (this.valid){
			//Set up Chat Socket
			this.socket.initSocket();
			this.ioConnection = await this.socket.onMessage().subscribe((message:any) => {
				//console.log(message);
				if (message.cID == parseInt(localStorage.getItem("channel-id"))) {
					this.msgList.push(message)
				}
			});
			// Fetch Groups
			this.groupList = await this.data.groupParse()
			//console.log(this.groupList)
			
			// Fetch Channels that user is a part of
			this.channelList = await this.data.channelParse(this.name)
			//console.log(this.channelList)
		}
	}
}
