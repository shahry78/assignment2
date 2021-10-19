import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatamanagerService } from '../services/datamanager.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private router:Router, private data:DatamanagerService) { }

	em=""     // Linked to the html login and password components
	pass=""
	verify=true;

	async loginClick() {
		console.log("EMAIL: "+this.em+" PASS: "+this.pass); // Debug
		this.verify = await this.data.loginParse(this.em,this.pass);
		if (this.verify) {
			localStorage.setItem("valid", "true");
			localStorage.setItem("email", this.em);
			this.router.navigate(["/account"]);
		}
		console.log(this.verify);
	}
	
	ngOnInit() {
		// Redirects user to account if they're already logged in
		var valid=localStorage.getItem("valid");
		if (valid){
		this.router.navigate(["/account"]);
		}
	}
}