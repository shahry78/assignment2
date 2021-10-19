import { Component, OnInit } from '@angular/core';
import { DatamanagerService } from '../services/datamanager.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	constructor ( private data:DatamanagerService ) { }

	name = '';
	email = localStorage.getItem("email");
	
	valid = false;

	userData:any;
	groupList:any;
	channelList:any;

	async ngOnInit() {
		//console.log("Reached account.ts");
		this.valid = this.data.userValid();
		if (this.valid){
			// Fetch User Data for Display
			this.userData = await this.data.accountParse(this.email)    
			//console.log(this.userData);
			this.name = this.userData.name;
			localStorage.setItem("name",this.name);

			// Fetch Groups
			this.groupList = await this.data.groupParse()
			//console.log(this.groupList)
			

			// Fetch Channels that user is a part of
			this.channelList = await this.data.channelParse(this.name)
			//console.log(this.channelList)
			
		}
	}
}